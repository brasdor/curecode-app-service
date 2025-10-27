import { ApiProperty } from "@nestjs/swagger"
import { Icd10Chapter } from "@prisma/client"

export class Icd10ChapterEntity implements Icd10Chapter {
  @ApiProperty()
  name: string

  @ApiProperty()
  code: string

  @ApiProperty()
  groupFrom: string

  @ApiProperty()
  groupTo: string
}
