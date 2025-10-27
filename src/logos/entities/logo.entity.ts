import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"

export class LogoEntity {
  constructor(partial: Partial<LogoEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  id: string

  @ApiProperty()
  organisationId: string

  @ApiProperty({
    description: "Binary data of the logo image encoded as base64 string",
    type: "string",
    format: "byte",
  })
  @Transform(({ value }) => (value ? value.toString("base64") : null), {
    toPlainOnly: true,
  })
  imageData: Uint8Array
}
