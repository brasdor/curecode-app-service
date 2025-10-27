import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class SummarySubEntity {
  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty()
  @IsNumber()
  tokens: number
}
