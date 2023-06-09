import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

  @IsNumber()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
