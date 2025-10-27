import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger"
import { AiService } from "./ai.service"
import {
  CreateCompletionCommentPromptDto,
  CreateCompletionDocumentPromptDto,
  CreateCompletionDto,
  CreateCompletionInlinePromptDto,
  CreateCompletionNurseLogEntryDocumentDto,
  CreateCompletionParagraphPromptDto,
  CreateCompletionProgressReportDocumentDto,
  CreateCompletionReferralLetterDocumentDto,
} from "./dto/create-completion.dto"
import { CreateSummaryDto } from "./dto/create-summary.dto"
import { CompletionEntity } from "./entities/completion.entity"
import { SummaryEntity } from "./entities/summary.entity"
import { FileInterceptor } from "@nestjs/platform-express"
import { NewTranscriptionResponseDto } from "./dto/create-transcription.dto"

@Controller("ai")
@ApiTags("ai")
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post()
  @ApiExtraModels(
    CreateCompletionDto,
    CreateCompletionReferralLetterDocumentDto,
    CreateCompletionProgressReportDocumentDto,
    CreateCompletionNurseLogEntryDocumentDto,
    CreateCompletionDocumentPromptDto,
    CreateCompletionParagraphPromptDto,
    CreateCompletionInlinePromptDto,
    CreateCompletionCommentPromptDto
  )
  @ApiBody({ schema: { $ref: getSchemaPath(CreateCompletionDto) } })
  @ApiCreatedResponse({ type: CompletionEntity })
  @HttpCode(HttpStatus.CREATED)
  async createCompletion(
    @Body() createCompletionDto: CreateCompletionDto,
    @Request() req
  ) {
    const { user } = req
    return await this.aiService.createCompletion(createCompletionDto, user)
  }

  @Get(":id")
  @ApiOkResponse({ type: CompletionEntity })
  async getCompletion(@Param("id") id: string) {
    return await this.aiService.getCompletion(id)
  }

  @Post("summaries")
  @ApiOkResponse({ type: SummaryEntity })
  async createSummary(
    @Body() createSummaryDto: CreateSummaryDto,
    @Request() req
  ): Promise<SummaryEntity> {
    const user = req.user

    return this.aiService.createSummaryForPatient(createSummaryDto, user)
  }

  @Get("summaries/:id")
  @ApiOkResponse({ type: SummaryEntity })
  async getSummary(@Param("id") patientId: string) {
    return this.aiService.getSummary(patientId)
  }
  @Post("transcriptions")
  @UseInterceptors(
    FileInterceptor("audioFile", {
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          "audio/mpeg",   // .mp3
          "audio/mp4",    // .m4a
          "audio/x-m4a",  // .m4a (alternative MIME)
          "audio/wav",    // .wav
          "audio/x-wav",  // .wav (alternative MIME)
          "audio/webm",   // .webm (browser recordings)
        ];

        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new Error("Unsupported file type"), false);
        }
        callback(null, true);
      },
    })
  )
  @ApiOperation({ summary: "Upload an audio file for transcription" })

  /*@Post("transcriptions")
  @UseInterceptors(FileInterceptor("audioFile"))
  @ApiOperation({ summary: "Upload an audio file for transcription" })
  @ApiConsumes("multipart/form-data") // Important for file upload
  */

  @ApiBody({
    description: "Audio file upload",
    required: true,
    schema: {
      type: "object",
      properties: {
        audioFile: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiOkResponse({ type: NewTranscriptionResponseDto })
  async createTranscription(
    @UploadedFile() audioFile: Express.Multer.File,
    @Request() req
  ) {
    return this.aiService.createTranscription(audioFile, req.user)
  }

  @ApiOkResponse({
    type: NewTranscriptionResponseDto,
  })
  @Get("transcriptions/:id")
  async getTranscription(@Param("id") id: string) {
    return this.aiService.getTranscription(id)
  }
}
