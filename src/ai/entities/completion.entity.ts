import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsInt, IsObject } from "class-validator"
import { User } from "./subEntities/user.entity"
import { Tenant } from "./subEntities/tenant.entity"
import { Prompt } from "./subEntities/prompt.entity"

class Document {
  @ApiProperty({ description: "Document ID" })
  @IsString()
  id: string
}

class CompletionContent {
  @ApiProperty({ description: "Content of the completion" })
  @IsString()
  content: string

  @ApiProperty({ description: "Number of tokens used in the completion" })
  @IsInt()
  tokens: number
}

export class CompletionEntity {
  @ApiProperty({ description: "Completion ID" })
  @IsString()
  id: string

  @ApiProperty({ description: "Creation date of the completion" })
  @IsString()
  createdAt: string

  @ApiProperty({ description: "Last update date of the completion" })
  @IsString()
  updatedAt: string

  @ApiProperty({
    description: "Completion date, or null if incomplete",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  completedAt: string | null

  @ApiProperty({
    description: "User associated with the completion",
    type: () => User,
  })
  @IsObject()
  user: User

  @ApiProperty({
    description: "Tenant associated with the completion",
    type: () => Tenant,
  })
  @IsObject()
  tenant: Tenant

  @ApiProperty({
    description: "Document associated with the completion",
    type: () => Document,
  })
  @IsObject()
  document: Document

  @ApiProperty({ description: "Prompt information", type: () => Prompt })
  @IsObject()
  prompt: Prompt

  @ApiProperty({
    description: "Completion content details",
    type: () => CompletionContent,
  })
  @IsObject()
  completion: CompletionContent
}
