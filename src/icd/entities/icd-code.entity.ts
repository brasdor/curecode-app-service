import { ApiProperty } from "@nestjs/swagger"
import { Icd10ChapterEntity } from "./icd-chapter.entity"
import { Icd10GroupEntity } from "./icd-group.entity"
import { Icd10Code } from "@prisma/client"

export class Icd10CodeEntity implements Icd10Code {
  @ApiProperty()
  Code: string

  @ApiProperty()
  Ebene: string

  @ApiProperty()
  Ort: string

  @ApiProperty()
  Art: string

  @ApiProperty()
  KapNr: string

  @ApiProperty()
  GrVon: string

  @ApiProperty()
  NormCode: string

  @ApiProperty()
  CodeOhnePunkt: string

  @ApiProperty()
  Titel: string

  @ApiProperty()
  Dreisteller: string

  @ApiProperty({ nullable: true })
  Viersteller: string

  @ApiProperty({ nullable: true })
  Fuenfsteller: string

  @ApiProperty()
  P295: string

  @ApiProperty()
  P301: string

  @ApiProperty()
  MortL1Code: string

  @ApiProperty()
  MortL2Code: string

  @ApiProperty()
  MortL3Code: string

  @ApiProperty()
  MortL4Code: string

  @ApiProperty()
  MorbLCode: string

  @ApiProperty()
  SexCode: string

  @ApiProperty()
  SexFehlerTyp: string

  @ApiProperty()
  AltUnt: string

  @ApiProperty()
  AltOb: string

  @ApiProperty()
  AltFehlerTyp: string

  @ApiProperty()
  Exot: string

  @ApiProperty()
  Belegt: string

  @ApiProperty()
  IfSGMeldung: string

  @ApiProperty()
  IfSGLabor: string

  @ApiProperty({ type: () => Icd10ChapterEntity })
  kapitel?: Icd10ChapterEntity

  @ApiProperty({ type: () => Icd10GroupEntity })
  gruppen?: Icd10GroupEntity

  //   @ApiProperty({ type: () => Icd10Mortality1 })
  //   mortL1?: Icd10Mortality1

  //   @ApiProperty({ type: () => Icd10Mortality2 })
  //   mortL2?: Icd10Mortality2

  //   @ApiProperty({ type: () => Icd10Mortality3 })
  //   mortL3?: Icd10Mortality3

  //   @ApiProperty({ type: () => Icd10Mortality4 })
  //   mortL4?: Icd10Mortality4

  //   @ApiProperty({ type: () => Icd10Morbidity })
  //   morbl?: Icd10Morbidity

  constructor(entity: any) {
    Object.assign(this, entity)
  }
}
