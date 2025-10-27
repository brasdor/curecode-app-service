import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class User {
  @ApiProperty({ description: "User ID" })
  @IsString()
  id: string
}
