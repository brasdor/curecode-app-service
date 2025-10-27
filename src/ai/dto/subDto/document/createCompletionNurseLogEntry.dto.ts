import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCompletionNurseLogEntryDocumentDto {
  @ApiProperty({
    description: "Unique identifier of the nurse log entry document",
  })
  @IsString()
  id: string

  @ApiProperty({ description: "Type of document", example: "nurseLogEntry" })
  @IsString()
  type: "nurseLogEntry"
}
