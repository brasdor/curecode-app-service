import { IsObject, IsOptional, IsString, IsUUID } from "class-validator"
import { Tenant } from "./subEntities/tenant.entity"
import { User } from "./subEntities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Prompt } from "./subEntities/prompt.entity"
import { SummarySubEntity } from "./subEntities/summary.entity"

export class SummaryEntity {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @IsString()
  createdAt: string

  @ApiProperty()
  @IsString()
  updatedAt: string

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  completedAt: string | null

  @ApiProperty()
  @IsObject()
  user: User

  @ApiProperty()
  @IsObject()
  tenant: Tenant

  @ApiProperty()
  @IsObject()
  prompt: Prompt

  @ApiProperty()
  @IsObject()
  summary: SummarySubEntity
}
