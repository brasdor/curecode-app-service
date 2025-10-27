import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsInt } from "class-validator"

export class CreateCompletionCommentPromptDto {
  @ApiProperty({ description: "Type of prompt", example: "comment" })
  @IsString()
  type: "comment"

  @ApiProperty({ description: "Draft content for the comment prompt" })
  @IsString()
  draftContent: string

  @ApiProperty({ description: "Final content of the comment" })
  @IsString()
  commentContent: string

  @ApiProperty({
    description: "Start position of the highlight within the content",
  })
  @IsInt()
  highlightStartPosition: number

  @ApiProperty({
    description: "End position of the highlight within the content",
  })
  @IsInt()
  highlightEndPosition: number
}
