import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common"
import { Response } from "express"
import { CreatePdfDto } from "./dto/create-pdf.dto"
import { PdfService } from "./pdf.service"

@Controller("pdf")
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  async create(@Body() createPdfDto: CreatePdfDto, @Res() res: Response) {
    try {
      const pdfBuffer = await this.pdfService.create(createPdfDto)

      // Set headers for PDF response
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
        "Content-Length": pdfBuffer.length,
      })

      // Send PDF as a response
      res.status(HttpStatus.OK).end(pdfBuffer)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error generating PDF",
        error: error.message,
      })
    }
  }
}
