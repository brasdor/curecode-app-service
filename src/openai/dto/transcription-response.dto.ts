import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class OpenAiTranscriptionResponseDto {
  @IsString()
  @ApiProperty()
  text: string
}
