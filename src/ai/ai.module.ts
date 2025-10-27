import { Module } from "@nestjs/common"
import { AiController } from "./ai.controller"
import { AiService } from "./ai.service"
import { PatientsService } from "../patients/patients.service"
import { PatientSummaryService } from "../patient-summary/patient-summary.service"

@Module({
  controllers: [AiController],
  providers: [AiService, PatientsService, PatientSummaryService],
  exports: [AiService],
})
export class AiModule {}
