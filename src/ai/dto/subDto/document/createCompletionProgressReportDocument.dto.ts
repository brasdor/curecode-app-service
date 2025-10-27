import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsString } from "class-validator"
import { SectionType } from "./section-type"
export class CreateCompletionProgressReportDocumentDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  type: "progressReport"

  @ApiProperty({ enum: SectionType, enumName: "SectionType" })
  @IsEnum(SectionType)
  sectionType!: SectionType
}
