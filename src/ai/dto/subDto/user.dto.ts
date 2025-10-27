import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UserDto {
  @ApiProperty({ description: "The user ID" })
  @IsString()
  id: string
}
