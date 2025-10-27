import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsInt } from "class-validator"

export class CreateCompletionInlinePromptDto {
  @ApiProperty({ description: "Type of prompt", example: "inline" })
  @IsString()
  type: "inline"

  @ApiProperty({ description: "Content of the inline prompt" })
  @IsString()
  content: string

  @ApiProperty({ description: "Position of the caret within the content" })
  @IsInt()
  caretPosition: number
}
