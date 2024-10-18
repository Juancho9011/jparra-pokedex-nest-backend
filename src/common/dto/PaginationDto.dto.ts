import { isNumber, IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {



    @IsOptional()
    @IsPositive()
    @Min(1)
    offset: number



    @IsOptional()
    @IsPositive()
    limit: number



}