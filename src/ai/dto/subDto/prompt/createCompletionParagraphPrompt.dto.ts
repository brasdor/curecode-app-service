import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCompletionParagraphPromptDto {
  @ApiProperty({ description: "Type of prompt", example: "paragraph" })
  @IsString()
  type: "paragraph"

  @ApiProperty({ description: "Content of the paragraph prompt" })
  @IsString()
  content: string
}
