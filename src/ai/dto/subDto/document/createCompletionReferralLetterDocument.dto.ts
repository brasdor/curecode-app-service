import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEnum } from "class-validator"
import { SectionType } from "./section-type"

export class CreateCompletionReferralLetterDocumentDto {
  @ApiProperty({ description: "Unique identifier of the document" })
  @IsString()
  id: string

  @ApiProperty({ description: "Type of document", example: "referralLetter" })
  @IsString()
  type: "referralLetter"

  @ApiProperty({ enum: SectionType, enumName: "SectionType" })
  @IsEnum(SectionType)
  sectionType!: SectionType
}
