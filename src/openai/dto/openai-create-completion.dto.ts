import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class OpenAiCreateCompletionDto {
  @IsString()
  @IsNotEmpty()
  prompt: string

  @IsString()
  @IsNotEmpty()
  option: string

  @IsOptional()
  @IsString()
  command?: string
}
