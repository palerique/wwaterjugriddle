import { Test, TestingModule } from '@nestjs/testing';
import { WaterjugriddleController } from './waterjugriddle.controller';
import { WaterjugriddleService } from './waterjugriddle.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { StepDto } from './dto/step.dto';

describe('WaterjugriddleController', () => {
    let controller: WaterjugriddleController;
    let mockService: WaterjugriddleService;
    let mockCacheManager: Cache;

    beforeEach(async () => {
        mockService = { solveWaterJugProblem: jest.fn() } as any;
        mockCacheManager = { get: jest.fn(), set: jest.fn() } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [WaterjugriddleController],
            providers: [{ provide: WaterjugriddleService, useValue: mockService }, {
                provide: CACHE_MANAGER, useValue: mockCacheManager,
            }],
        }).compile();

        controller = module.get<WaterjugriddleController>(WaterjugriddleController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return cached solution when exist', async () => {
        const reqBody = { x_capacity: '5', y_capacity: '7', z_amount_wanted: '4' };
        const cachedSolution = [{ operation: 'some operation', result: 'result' }];
        jest.spyOn(mockCacheManager, 'get').mockResolvedValueOnce(JSON.stringify(cachedSolution));
        expect(await controller.solve(reqBody)).toEqual({ solution: cachedSolution });
    });

    it('should calculate solution when no cached solution found', async () => {
        const reqBody = { x_capacity: '5', y_capacity: '7', z_amount_wanted: '4' };
        const calculatedSolution: StepDto[] = [{
            step: 1,
            bucketX: 0,
            bucketY: 0,
            action: 'some operation',
            status: 'result',
        }];
        jest.spyOn(mockCacheManager, 'get').mockResolvedValueOnce(null);
        jest.spyOn(mockService, 'solveWaterJugProblem').mockReturnValueOnce(calculatedSolution);
        expect(await controller.solve(reqBody)).toEqual({ solution: calculatedSolution });
    });

    it('should return message when calculation return no solution', async () => {
        const reqBody = { x_capacity: '5', y_capacity: '7', z_amount_wanted: '15' };
        jest.spyOn(mockCacheManager, 'get').mockResolvedValueOnce(null);
        jest.spyOn(mockService, 'solveWaterJugProblem').mockReturnValueOnce(null);
        expect(await controller.solve(reqBody)).toEqual({ message: 'No solution possible' });
    });
});
