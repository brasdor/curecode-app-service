import { ApiProperty } from "@nestjs/swagger"
import { Icd10CodeEntity } from "../entities/icd-code.entity"
import { Icd10GroupEntity } from "../entities/icd-group.entity"
import { Icd10ChapterEntity } from "../entities/icd-chapter.entity"

export class GetIcdSearchDto {
  @ApiProperty({ required: false, type: Icd10CodeEntity, isArray: true })
  codes?: Icd10CodeEntity[]

  @ApiProperty({ required: false, type: Icd10GroupEntity, isArray: true })
  groups?: Icd10GroupEntity[]

  @ApiProperty({ required: false, type: Icd10ChapterEntity, isArray: true })
  chapters?: Icd10ChapterEntity[]
}
