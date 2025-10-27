import { ApiProperty, OmitType } from "@nestjs/swagger"
import { Patient } from "@prisma/client"
import { DocumentEntity } from "../../documents/entities/document.entity"
import { PatientSummaryEntity } from "../../patient-summary/entities/patient-summary.entity"
import { ConsultationEntity } from "../../consultations/entities/consultation.entity"

export class PatientEntity implements Patient {
  @ApiProperty()
  id: string

  @ApiProperty()
  organisationId: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  insurance: string

  @ApiProperty()
  ahvNumber: string

  @ApiProperty()
  birthDate: Date

  @ApiProperty()
  street: string

  @ApiProperty()
  city: string

  @ApiProperty()
  zip: string

  @ApiProperty({ required: false })
  apartmentNumber: string | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ required: false, type: () => [DocumentEntity] })
  documents?: DocumentEntity[]

  @ApiProperty({ type: () => [ConsultationEntity] })
  consultations: ConsultationEntity[]

  @ApiProperty({ required: false, type: () => [PatientSummaryEntity] })
  summary?: PatientSummaryEntity
}

export class PatientWithoutRelationsEntity extends OmitType(PatientEntity, [
  "consultations",
  "documents",
  "summary",
] as const) {}
