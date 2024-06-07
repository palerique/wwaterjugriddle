import { Injectable, Logger } from '@nestjs/common';
import { StepDto } from './dto/step.dto';

@Injectable()
export class WaterJugRiddleService {
    private readonly logger = new Logger(WaterJugRiddleService.name);

    solveWaterJugProblem(x: number, y: number, z: number): StepDto[] | null {
        this.logger.log(`Received solve request with x_capacity=${x}, y_capacity=${y}, z_amount_wanted=${z}`);

        if (z > Math.max(x, y)) {
            this.logger.error('Invalid input values. Ensure Wanted Amount is less than or equal to the biggest water jug.');
            return null;
        }

        if (z % this.calculateGreatestCommonDivisor(x, y) !== 0) {
            this.logger.error('Invalid input values. Ensure Wanted Amount is divisible by the greatest common divisor of the water jugs.');
            return null;
        }

        this.logger.log('Input is valid. Calculating solution...');

        const queue: [number, number, StepDto[]][] = [];
        const visited: Set<string> = new Set();

        queue.push([0, 0, []]);

        while (queue.length > 0) {
            const [currX, currY, steps] = queue.shift()!;
            const stateKey = `${currX}-${currY}`;

            if (visited.has(stateKey)) {
                this.logger.log(`Skipping already visited state: ${stateKey}`);
                continue;
            }
            visited.add(stateKey);
            this.logger.log(`Visiting state: ${stateKey} - x = ${currX}, y = ${currY}, z = ${z}`);

            if (currX === z || currY === z || currX + currY === z) {
                let stepDtos = steps.concat({
                    step: steps.length + 1, bucketX: currX, bucketY: currY, action: 'Goal reached', status: 'Solved',
                });
                this.logger.log('Solution found', stepDtos);
                return stepDtos;
            }
            this.logger.log('Goal not reached');

            const possibleStates: [number, number, string][] = [[x, currY, 'Fill bucket X'], [currX, y, 'Fill bucket Y'], [0, currY, 'Empty bucket X'], [currX, 0, 'Empty bucket Y'], [Math.min(currX + currY, x), currX + currY <= x ? 0 : currY - (x - currX), 'Pour bucket Y into X'], [currX + currY <= y ? 0 : currX - (y - currY), Math.min(currX + currY, y), 'Pour bucket X into Y']];
            this.logger.log(`Possible states: ${possibleStates}`);

            for (const [nextX, nextY, action] of possibleStates) {
                this.logger.log(`Checking next state: x = ${nextX}, y = ${nextY}, action = ${action}`);
                if (!visited.has(`${nextX}-${nextY}`)) {
                    this.logger.log(`Adding next state: x = ${nextX}, y = ${nextY}, action = ${action} to the queue`);
                    queue.push([nextX, nextY, steps.concat({
                        step: steps.length + 1, bucketX: nextX, bucketY: nextY, action,
                    })]);
                } else {
                    this.logger.log(`Next state: x = ${nextX}, y = ${nextY}, action = ${action} already visited`);
                }
            }
        }

        this.logger.warn('No solution possible');
        return null;
    }

    private calculateGreatestCommonDivisor(a: number, b: number): number {
        this.logger.log(`Calculating GCD of ${a} and ${b}`);
        let greatestCommonDivisor = b === 0 ? a : this.calculateGreatestCommonDivisor(b, a % b);
        this.logger.log(`GCD of ${a} and ${b} is ${greatestCommonDivisor}`);
        return greatestCommonDivisor;
    }
}
