import { ApiProperty } from "@nestjs/swagger"
import { IsInt } from "class-validator"

export class Prompt {
  @ApiProperty({ description: "Number of tokens used in the prompt" })
  @IsInt()
  tokens: number
}
