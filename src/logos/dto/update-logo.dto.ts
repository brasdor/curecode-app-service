import { ApiProperty } from "@nestjs/swagger"
import { IsInt } from "class-validator"
import { IsBase64Image } from "../../common/decorators/validation"

export class UpdateLogoDto {
  @IsInt()
  @ApiProperty()
  organisationId: string

  @IsBase64Image({ message: "Invalid base64 image format" })
  @ApiProperty()
  imageData: string // Expecting base64-encoded string for the image
}
