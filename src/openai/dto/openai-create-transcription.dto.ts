import { IsNotEmpty, IsString } from "class-validator"

export class OpenAiCreateTranscriptionDto {
  @IsString()
  @IsNotEmpty()
  base64Audio: string
}
