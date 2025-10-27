import { ApiProperty, OmitType } from "@nestjs/swagger"
import { Consultation } from "@prisma/client"
import { PatientEntity } from "../../patients/entities/patient.entity"
import { UserEntity } from "../../users"

export class ConsultationEntity implements Consultation {
  @ApiProperty()
  id: string

  @ApiProperty()
  date: Date

  @ApiProperty({ type: String, nullable: true })
  transcriptionId: string | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  userId: string

  @ApiProperty({ type: UserEntity })
  user: UserEntity

  @ApiProperty()
  patientId: string

  @ApiProperty({ type: PatientEntity })
  patient: PatientEntity
}

export class ConsultationWithoutRelationsEntity extends OmitType(
  ConsultationEntity,
  ["user", "patient"] as const
) {}
