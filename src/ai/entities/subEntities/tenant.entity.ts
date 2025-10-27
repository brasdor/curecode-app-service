import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class Tenant {
  @ApiProperty({ description: "Tenant ID" })
  @IsString()
  id: string
}
