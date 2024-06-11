import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
    Post,
} from '@nestjs/common';
import { WaterjugriddleService } from './waterjugriddle.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { SolveRequestDto } from './dto/solveRequest.dto';
import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { SolutionFoundDto } from './dto/solutionFound.dto';
import { NoPossibleSolutionDto } from './dto/noPossibleSolution.dto';

@Controller('waterjugriddle')
export class WaterjugriddleController {
    private readonly logger = new Logger(WaterjugriddleController.name);

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly waterJugService: WaterjugriddleService,
    ) {}

    @Post('solve')
    @ApiOperation({ summary: 'Solve the water jug riddle' })
    @ApiResponse({
        status: 200,
        description: 'Returns the solution to the water jug riddle',
        type: SolutionFoundDto,
        schema: {
            example: {
                solution: [
                    {
                        action: 'Fill bucket Y',
                        bucketX: 0,
                        bucketY: 5,
                        step: 1,
                    },
                    {
                        action: 'Pour bucket Y into X',
                        bucketX: 3,
                        bucketY: 2,
                        step: 2,
                    },
                    {
                        action: 'Empty bucket X',
                        bucketX: 0,
                        bucketY: 2,
                        step: 3,
                    },
                    {
                        action: 'Pour bucket Y into X',
                        bucketX: 2,
                        bucketY: 0,
                        step: 4,
                    },
                    {
                        action: 'Fill bucket Y',
                        bucketX: 2,
                        bucketY: 5,
                        step: 5,
                    },
                    {
                        action: 'Pour bucket Y into X',
                        bucketX: 3,
                        bucketY: 4,
                        status: 'Solved',
                        step: 6,
                    },
                ],
            },
            $ref: getSchemaPath(SolutionFoundDto),
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Returns an error message if the input values are invalid',
        type: NoPossibleSolutionDto,
        schema: {
            example: {
                message: 'No solution is possible',
            },
            $ref: getSchemaPath(NoPossibleSolutionDto),
        },
    })
    @ApiTags('water-jug-riddle')
    @ApiBody({ type: SolveRequestDto })
    async solve(
        @Body() body: SolveRequestDto,
    ): Promise<SolutionFoundDto | NoPossibleSolutionDto> {
        const { x_capacity, y_capacity, z_amount_wanted } = body;
        this.logger.log(
            `Received solve request with x_capacity=${x_capacity}, y_capacity=${y_capacity}, z_amount_wanted=${z_amount_wanted}`,
        );

        if (!x_capacity || !y_capacity || !z_amount_wanted) {
            this.logger.error(
                'Invalid input values. Ensure x_capacity, y_capacity, and z_amount_wanted are provided.',
            );
            throw new HttpException(
                'Please provide x_capacity, y_capacity, and z_amount_wanted.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const x = parseInt(x_capacity, 10);
        const y = parseInt(y_capacity, 10);
        const z = parseInt(z_amount_wanted, 10);

        if (isNaN(x) || isNaN(y) || isNaN(z) || x <= 0 || y <= 0 || z <= 0) {
            this.logger.error(
                'Invalid input values. Ensure x, y, and z are positive integers.',
            );
            throw new HttpException(
                'Invalid input values. Ensure x, y, and z are positive integers.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const cacheKey = `${x}-${y}-${z}`;
        const cachedSolution: string = await this.cacheManager.get(cacheKey);

        if (cachedSolution) {
            this.logger.log('Returning cached solution', cachedSolution);
            return { solution: JSON.parse(cachedSolution) };
        }

        this.logger.log('No cached solution found. Calculating solution...');
        const solution = this.waterJugService.solveWaterJugProblem(x, y, z);
        if (solution) {
            this.logger.log('Solution found', solution);
            await this.cacheManager.set(
                cacheKey,
                JSON.stringify(solution),
                1800000,
            );
            return { solution };
        } else {
            this.logger.warn('No solution possible');
            return { message: 'No solution possible' };
        }
    }
}
