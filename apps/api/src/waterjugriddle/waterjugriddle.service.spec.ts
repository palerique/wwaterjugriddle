import { WaterjugriddleService } from './waterjugriddle.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WaterjugriddleService', () => {
    let service: WaterjugriddleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WaterjugriddleService],
        }).compile();

        service = module.get<WaterjugriddleService>(WaterjugriddleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should solve correctly', async () => {
        const res = service.solveWaterJugProblem(3, 5, 4);
        // define your expectations for the correct result
        expect(res).toEqual([
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
        ]);
    });

    it('should solve correctly II', async () => {
        const res = service.solveWaterJugProblem(1, 100, 18);
        // define your expectations for the correct result
        expect(res).toEqual([
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 0,
                step: 1,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 1,
                step: 2,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 1,
                step: 3,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 2,
                step: 4,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 2,
                step: 5,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 3,
                step: 6,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 3,
                step: 7,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 4,
                step: 8,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 4,
                step: 9,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 5,
                step: 10,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 5,
                step: 11,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 6,
                step: 12,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 6,
                step: 13,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 7,
                step: 14,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 7,
                step: 15,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 8,
                step: 16,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 8,
                step: 17,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 9,
                step: 18,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 9,
                step: 19,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 10,
                step: 20,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 10,
                step: 21,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 11,
                step: 22,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 11,
                step: 23,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 12,
                step: 24,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 12,
                step: 25,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 13,
                step: 26,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 13,
                step: 27,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 14,
                step: 28,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 14,
                step: 29,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 15,
                step: 30,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 15,
                step: 31,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 16,
                step: 32,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 16,
                step: 33,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 17,
                step: 34,
            },
            {
                action: 'Fill bucket X',
                bucketX: 1,
                bucketY: 17,
                step: 35,
            },
            {
                action: 'Pour bucket X into Y',
                bucketX: 0,
                bucketY: 18,
                status: 'Solved',
                step: 36,
            },
        ]);
    });

    it('should solve correctly with the shortest path III', async () => {
        const res = service.solveWaterJugProblem(1, 111, 100);
        // define your expectations for the correct result
        expect(res).toEqual([
            {
                step: 1,
                bucketX: 0,
                bucketY: 111,
                action: 'Fill bucket Y',
            },
            {
                step: 2,
                bucketX: 1,
                bucketY: 110,
                action: 'Pour bucket Y into X',
            },
            {
                step: 3,
                bucketX: 0,
                bucketY: 110,
                action: 'Empty bucket X',
            },
            {
                step: 4,
                bucketX: 1,
                bucketY: 109,
                action: 'Pour bucket Y into X',
            },
            {
                step: 5,
                bucketX: 0,
                bucketY: 109,
                action: 'Empty bucket X',
            },
            {
                step: 6,
                bucketX: 1,
                bucketY: 108,
                action: 'Pour bucket Y into X',
            },
            {
                step: 7,
                bucketX: 0,
                bucketY: 108,
                action: 'Empty bucket X',
            },
            {
                step: 8,
                bucketX: 1,
                bucketY: 107,
                action: 'Pour bucket Y into X',
            },
            {
                step: 9,
                bucketX: 0,
                bucketY: 107,
                action: 'Empty bucket X',
            },
            {
                step: 10,
                bucketX: 1,
                bucketY: 106,
                action: 'Pour bucket Y into X',
            },
            { step: 11, bucketX: 0, bucketY: 106, action: 'Empty bucket X' },
            {
                step: 12,
                bucketX: 1,
                bucketY: 105,
                action: 'Pour bucket Y into X',
            },
            { step: 13, bucketX: 0, bucketY: 105, action: 'Empty bucket X' },
            {
                step: 14,
                bucketX: 1,
                bucketY: 104,
                action: 'Pour bucket Y into X',
            },
            { step: 15, bucketX: 0, bucketY: 104, action: 'Empty bucket X' },
            {
                step: 16,
                bucketX: 1,
                bucketY: 103,
                action: 'Pour bucket Y into X',
            },
            { step: 17, bucketX: 0, bucketY: 103, action: 'Empty bucket X' },
            {
                step: 18,
                bucketX: 1,
                bucketY: 102,
                action: 'Pour bucket Y into X',
            },
            { step: 19, bucketX: 0, bucketY: 102, action: 'Empty bucket X' },
            {
                step: 20,
                bucketX: 1,
                bucketY: 101,
                action: 'Pour bucket Y into X',
            },
            { step: 21, bucketX: 0, bucketY: 101, action: 'Empty bucket X' },
            {
                step: 22,
                bucketX: 1,
                bucketY: 100,
                action: 'Pour bucket Y into X',
                status: 'Solved',
            },
        ]);
    });

    it('should return null if z > x, y', async () => {
        const res = service.solveWaterJugProblem(3, 5, 8);
        expect(res).toBeNull();
    });

    it('should return null if z is not divisible by gcd(x, y)', async () => {
        const res = service.solveWaterJugProblem(30, 50, 4);
        expect(res).toBeNull();
    });

    it('should return solution if already at goal', async () => {
        const res = service.solveWaterJugProblem(4, 3, 4);
        //check the stepDto for the first step only
        expect(res[0]).toEqual({
            action: 'Fill bucket X',
            bucketX: 4,
            bucketY: 0,
            status: 'Solved',
            step: 1,
        });
    });

    it('should return null if no solution possible', async () => {
        const res = service.solveWaterJugProblem(2, 6, 5);
        expect(res).toBeNull();
    });
});
