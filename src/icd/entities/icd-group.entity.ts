import { ApiProperty } from "@nestjs/swagger"
import { Icd10ChapterEntity } from "./icd-chapter.entity"
import { Icd10CodeEntity } from "./icd-code.entity"
import { Icd10Group } from "@prisma/client"

export class Icd10GroupEntity implements Icd10Group {
  @ApiProperty()
  groupFrom: string

  @ApiProperty({ nullable: true })
  groupTo: string

  @ApiProperty()
  chapterCode: string

  @ApiProperty()
  title: string

  @ApiProperty({ type: () => Icd10ChapterEntity })
  kapitel?: Icd10ChapterEntity

  @ApiProperty({ type: () => [Icd10CodeEntity] })
  Icd10Codes?: Icd10CodeEntity[]

  constructor(entity: any) {
    Object.assign(this, entity)
  }
}
