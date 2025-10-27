import { ApiProperty } from "@nestjs/swagger"
import { PatientSummary } from "@prisma/client"

export class PatientSummaryEntity implements PatientSummary {
  @ApiProperty()
  id: string
  @ApiProperty()
  patientId: string
  @ApiProperty()
  contentHash: string
  @ApiProperty()
  insurance: string
  @ApiProperty()
  createdAt: Date
  @ApiProperty()
  updatedAt: Date
}
