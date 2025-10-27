import { Module } from "@nestjs/common"
import { PdfController } from "./pdf.controller"
import { PdfService } from "./pdf.service"
import { PatientsModule } from "../patients/patients.module"

@Module({
  imports: [PatientsModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
