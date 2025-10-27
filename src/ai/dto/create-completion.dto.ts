import { ApiProperty, getSchemaPath } from "@nestjs/swagger"
import { Type } from "class-transformer"
import {
  ValidateNested,
  IsString,
  IsInt,
  IsIn,
  Equals,
  IsOptional,
  IsDefined,
} from "class-validator"
import { TenantDto } from "./subDto/tenant.dto"
import { UserDto } from "./subDto/user.dto"
import { SectionType } from "./subDto/document/section-type"

const LANGS = ["de", "fr", "it", "en"] as const
type Language = (typeof LANGS)[number]

// ----- Base -----
export class IdDto {
  @ApiProperty()
  @IsString()
  id!: string
}

// ----- Documents -----
export class CreateCompletionReferralLetterDocumentDto extends IdDto {
  @ApiProperty({ enum: ["referralLetter"] })
  @Equals("referralLetter")
  type!: "referralLetter"

  @ApiProperty({ enum: SectionType, enumName: "SectionType" })
  @IsOptional()
  sectionType?: SectionType
}

export class CreateCompletionProgressReportDocumentDto extends IdDto {
  @ApiProperty({ enum: ["progressReport"] })
  @Equals("progressReport")
  type!: "progressReport"

  @ApiProperty({ enum: SectionType, enumName: "SectionType" })
  @IsOptional()
  sectionType?: SectionType
}

export class CreateCompletionNurseLogEntryDocumentDto extends IdDto {
  @ApiProperty({ enum: ["nurseLogEntry"] })
  @Equals("nurseLogEntry")
  type!: "nurseLogEntry"
}

// ----- Prompts -----
class BasePromptDto {
  @ApiProperty({ enum: LANGS, required: false })
  @IsOptional()
  @IsIn(LANGS)
  language?: Language
}

export class CreateCompletionDocumentPromptDto extends BasePromptDto {
  @ApiProperty({ enum: ["document"] })
  @Equals("document")
  type!: "document"

  @ApiProperty()
  @IsString()
  content!: string
}

export class CreateCompletionParagraphPromptDto extends BasePromptDto {
  @ApiProperty({ enum: ["paragraph"] })
  @Equals("paragraph")
  type!: "paragraph"

  @ApiProperty()
  @IsString()
  content!: string
}

export class CreateCompletionInlinePromptDto extends BasePromptDto {
  @ApiProperty({ enum: ["inline"] })
  @Equals("inline")
  type!: "inline"

  @ApiProperty()
  @IsString()
  content!: string

  @ApiProperty()
  @IsInt()
  caretPosition!: number
}

export class CreateCompletionCommentPromptDto extends BasePromptDto {
  @ApiProperty({ enum: ["comment"] })
  @Equals("comment")
  type!: "comment"

  @ApiProperty()
  @IsString()
  draftContent!: string

  @ApiProperty()
  @IsString()
  commentContent!: string

  @ApiProperty()
  @IsInt()
  highlightStartPosition!: number

  @ApiProperty()
  @IsInt()
  highlightEndPosition!: number
}

// ----- Root -----
export class CreateCompletionDto {
  @ApiProperty({ type: () => UserDto })
  @ValidateNested()
  @Type(() => UserDto)
  @IsDefined()
  user!: UserDto

  @ApiProperty({ type: () => TenantDto })
  @ValidateNested()
  @Type(() => TenantDto)
  @IsDefined()
  tenant!: TenantDto

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(CreateCompletionReferralLetterDocumentDto) },
      { $ref: getSchemaPath(CreateCompletionProgressReportDocumentDto) },
      { $ref: getSchemaPath(CreateCompletionNurseLogEntryDocumentDto) },
    ],
    discriminator: {
      propertyName: "type",
      mapping: {
        referralLetter: getSchemaPath(
          CreateCompletionReferralLetterDocumentDto
        ),
        progressReport: getSchemaPath(
          CreateCompletionProgressReportDocumentDto
        ),
        nurseLogEntry: getSchemaPath(CreateCompletionNurseLogEntryDocumentDto),
      },
    },
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: "type",
      subTypes: [
        {
          value: CreateCompletionReferralLetterDocumentDto,
          name: "referralLetter",
        },
        {
          value: CreateCompletionProgressReportDocumentDto,
          name: "progressReport",
        },
        {
          value: CreateCompletionNurseLogEntryDocumentDto,
          name: "nurseLogEntry",
        },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  document!:
    | CreateCompletionReferralLetterDocumentDto
    | CreateCompletionProgressReportDocumentDto
    | CreateCompletionNurseLogEntryDocumentDto

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(CreateCompletionDocumentPromptDto) },
      { $ref: getSchemaPath(CreateCompletionParagraphPromptDto) },
      { $ref: getSchemaPath(CreateCompletionInlinePromptDto) },
      { $ref: getSchemaPath(CreateCompletionCommentPromptDto) },
    ],
    discriminator: {
      propertyName: "type",
      mapping: {
        document: getSchemaPath(CreateCompletionDocumentPromptDto),
        paragraph: getSchemaPath(CreateCompletionParagraphPromptDto),
        inline: getSchemaPath(CreateCompletionInlinePromptDto),
        comment: getSchemaPath(CreateCompletionCommentPromptDto),
      },
    },
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: CreateCompletionDocumentPromptDto, name: "document" },
        { value: CreateCompletionParagraphPromptDto, name: "paragraph" },
        { value: CreateCompletionInlinePromptDto, name: "inline" },
        { value: CreateCompletionCommentPromptDto, name: "comment" },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  prompt!:
    | CreateCompletionDocumentPromptDto
    | CreateCompletionParagraphPromptDto
    | CreateCompletionInlinePromptDto
    | CreateCompletionCommentPromptDto
}
