import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for solving a jug problem.
 */
export class SolveRequestDto {
    @ApiProperty({
        description: 'The capacity of the first jug', example: '3',
    }) x_capacity: string;

    @ApiProperty({
        description: 'The capacity of the second jug', example: '5',
    }) y_capacity: string;

    @ApiProperty({
        description: 'The amount of water wanted', example: '4',
    }) z_amount_wanted: string;
}
