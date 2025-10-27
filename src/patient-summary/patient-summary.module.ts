import { Module } from "@nestjs/common"
import { PatientSummaryService } from "./patient-summary.service"
import { PrismaModule } from "../prisma"

@Module({
  providers: [PatientSummaryService],
  imports: [PrismaModule],
  exports: [PatientSummaryService],
})
export class PatientsModule {}
