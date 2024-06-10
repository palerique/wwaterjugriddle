import { ApiProperty } from '@nestjs/swagger';

export class StepDto {
    @ApiProperty({
        type: 'number',
        description: 'The step number',
        example: '1',
    })
    step: number;
    @ApiProperty({
        type: 'number',
        description: 'The amount of water in the first jug',
        example: '5',
    })
    bucketX: number;
    @ApiProperty({
        type: 'number',
        description: 'The amount of water in the second jug',
        example: '30',
    })
    bucketY: number;
    @ApiProperty({
        type: 'string',
        description: 'The action taken',
        example: 'Empty jug X',
    })
    action: string;
    @ApiProperty({
        type: 'string',
        description: 'The status of the action',
        example: 'solved',
    })
    status?: string;
}
