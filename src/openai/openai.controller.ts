import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common"
import { ApiOkResponse } from "@nestjs/swagger"
import { Response } from "express"
import { match } from "ts-pattern"
import { OpenAiCreateCompletionDto } from "./dto/openai-create-completion.dto"
import { OpenAiCreateTranscriptionDto } from "./dto/openai-create-transcription.dto"
import { OpenAiTranscriptionResponseDto } from "./dto/transcription-response.dto"
import { OpenaiService } from "./openai.service"

@Controller("openai")
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  async createCompletion(
    @Body() createCompletionDto: OpenAiCreateCompletionDto,
    @Res() res: Response
  ) {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
      throw new HttpException("Missing OPENAI_API_KEY", HttpStatus.BAD_REQUEST)
    }

    const { prompt, option, command } = createCompletionDto

    const messages = match(option)
      .with("improve", () => [
        {
          role: "system",
          content:
            "You are an AI writing assistant that improves existing text...",
        },
        { role: "user", content: `The existing text is: ${prompt}` },
      ])
      .with("fix", () => [
        {
          role: "system",
          content:
            "You are an AI writing assistant that fixes grammar and spelling errors...",
        },
        { role: "user", content: `The existing text is: ${prompt}` },
      ])
      .with("shorter", () => [
        {
          role: "system",
          content:
            "You are an AI writing assistant that shortens existing text...",
        },
        { role: "user", content: `The existing text is: ${prompt}` },
      ])
      .with("longer", () => [
        {
          role: "system",
          content:
            "You are an AI writing assistant that lengthens existing text...",
        },
        { role: "user", content: `The existing text is: ${prompt}` },
      ])
      .with("continue", () => [
        {
          role: "system",
          content:
            "You are an AI writing assistant that continues existing text based on context from prior text...",
        },
        { role: "user", content: prompt },
      ])
      .with("zap", () => [
        {
          role: "system",
          content:
            "You are an AI writing assistant that generates text based on a prompt...",
        },
        {
          role: "user",
          content: `For this text: ${prompt}. You have to respect the command: ${command}`,
        },
      ])
      .run()

    return this.openaiService.generateCompletion(messages, res)
  }

  @Post("transcribe")
  @ApiOkResponse({ type: OpenAiTranscriptionResponseDto })
  async transcribeAudio(
    @Body() createTranscriptionDto: OpenAiCreateTranscriptionDto
  ): Promise<OpenAiTranscriptionResponseDto> {
    // Process the transcription as usual
    return this.openaiService.transcribeAudio(
      createTranscriptionDto.base64Audio
    )
  }
}
