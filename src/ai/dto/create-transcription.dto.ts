import { ApiProperty } from "@nestjs/swagger"
import { CreateTranscriptionResponse } from "../../openapi"
import { UserDto } from "./subDto/user.dto"
import { TenantDto } from "./subDto/tenant.dto"

export class NewTranscriptionResponseDto
  implements CreateTranscriptionResponse
{
  @ApiProperty({ example: "abcdef123456" })
  id: string

  @ApiProperty({ example: "2024-03-08T12:00:00Z" })
  createdAt: string

  @ApiProperty({ example: "2024-03-08T12:05:00Z" })
  updatedAt: string

  @ApiProperty({ example: "2024-03-08T12:10:00Z", nullable: true })
  completedAt: string | null

  @ApiProperty({ type: UserDto })
  user: UserDto

  @ApiProperty({ type: TenantDto })
  tenant: TenantDto

  @ApiProperty({
    example: { content: "This is a transcribed sentence." },
    description: "The actual transcription content",
  })
  transcription: {
    content: string
  }
}
