import { ApiProperty } from '@nestjs/swagger';

export class NoPossibleSolutionDto {
    @ApiProperty({
        type: 'string',
        description: 'A message indicating that no solution is possible',
    })
    message: 'No solution possible';
}
