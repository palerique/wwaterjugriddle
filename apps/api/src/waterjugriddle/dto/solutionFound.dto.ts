import { ApiProperty } from '@nestjs/swagger';
import { StepDto } from './step.dto';

export class SolutionFoundDto {
    @ApiProperty({
        type: [StepDto],
        description: 'The steps taken to solve the water jug riddle',
    })
    solution: StepDto[];
}
