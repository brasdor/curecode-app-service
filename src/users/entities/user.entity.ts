import { ApiProperty } from "@nestjs/swagger"
import { Level, User } from "@prisma/client"
import { Exclude } from "class-transformer"
import { IsEnum } from "class-validator"

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  id: string

  @ApiProperty()
  organisationId: string

  @ApiProperty()
  email: string

  @ApiProperty()
  phoneNumber: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @IsEnum(Level)
  @ApiProperty({
    enum: Level,
    enumName: "Level", // <-- makes #/components/schemas/Level
  })
  level: Level

  @Exclude()
  refreshTokenJti: string

  @Exclude()
  passwordHash: string

  @Exclude()
  passwordHashSalt: string
}
