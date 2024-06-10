import { Body, Controller, HttpException, HttpStatus, Inject, Logger, Post } from '@nestjs/common';
import { WaterjugriddleService } from './waterjugriddle.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { SolveRequestDto } from './dto/solveRequest.dto';

@Controller('waterjugriddle')
export class WaterjugriddleController {

    private readonly logger = new Logger(WaterjugriddleController.name);

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly waterJugService: WaterjugriddleService) {
    }

    @Post('solve')
    async solve(@Body() body: SolveRequestDto) {
        const { x_capacity, y_capacity, z_amount_wanted } = body;
        this.logger.log(`Received solve request with x_capacity=${x_capacity}, y_capacity=${y_capacity}, z_amount_wanted=${z_amount_wanted}`);

        if (!x_capacity || !y_capacity || !z_amount_wanted) {
            this.logger.error('Invalid input values. Ensure x_capacity, y_capacity, and z_amount_wanted are provided.');
            throw new HttpException('Please provide x_capacity, y_capacity, and z_amount_wanted.', HttpStatus.BAD_REQUEST);
        }

        const x = parseInt(x_capacity, 10);
        const y = parseInt(y_capacity, 10);
        const z = parseInt(z_amount_wanted, 10);

        if (isNaN(x) || isNaN(y) || isNaN(z) || x <= 0 || y <= 0 || z <= 0) {
            this.logger.error('Invalid input values. Ensure x, y, and z are positive integers.');
            throw new HttpException('Invalid input values. Ensure x, y, and z are positive integers.', HttpStatus.BAD_REQUEST);
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
            await this.cacheManager.set(cacheKey, JSON.stringify(solution), 1800000);
            return { solution };
        } else {
            this.logger.warn('No solution possible');
            return { message: 'No solution possible' };
        }
    }
}
