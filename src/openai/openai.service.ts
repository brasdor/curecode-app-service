import { openai } from "@ai-sdk/openai"
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common"
import { streamText } from "ai"
import { Response } from "express"
import * as fs from "fs"
import OpenAI from "openai"
import { join } from "path"
import { ConfigService } from "../config/config.service"

@Injectable()
export class OpenaiService {
  private openai: OpenAI

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get("OPENAI_API_KEY"),
    })
  }

  async generateCompletion(messages: any[], res: Response) {
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages,
    })

    return result.pipeTextStreamToResponse(res)
  }

  async transcribeAudio(base64Audio: string): Promise<{ text: string }> {
    const tempDir = process.env.TEMP_DIR || join(__dirname, "../../tmp")
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    const uniqueFilename = `temp-audio-${Date.now()}.wav`
    const filePath = join(tempDir, uniqueFilename)

    try {
      if (!base64Audio) {
        throw new BadRequestException("Base64 audio string is required")
      }

      // Decode base64 audio and write to a temp file
      const audioBuffer = Buffer.from(base64Audio, "base64")
      fs.writeFileSync(filePath, audioBuffer)

      // Create a read stream and send it to OpenAI
      const audioFile = fs.createReadStream(filePath)
      return await this.openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
        response_format: "json",
        language: "de",
      })
    } catch (error) {
      throw new InternalServerErrorException("Transcription failed", {
        cause: error,
      })
    } finally {
      // Clean up temporary file
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      } catch (cleanupError) {
        console.error(
          "Failed to clean up temporary file:",
          cleanupError.message
        )
      }
    }
  }
}
