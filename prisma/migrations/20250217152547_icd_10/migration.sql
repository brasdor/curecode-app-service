-- CreateTable
CREATE TABLE "Icd10Chapter" (
    "code" VARCHAR(2) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10Chapter_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10Group" (
    "groupFrom" VARCHAR(3) NOT NULL,
    "groupTo" VARCHAR(3),
    "chapterCode" VARCHAR(2) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10Group_pkey" PRIMARY KEY ("groupFrom")
);

-- CreateTable
CREATE TABLE "Icd10Morbidity" (
    "code" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10Morbidity_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10MortalityGroup1" (
    "code" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10MortalityGroup1_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10Mortality1" (
    "code" VARCHAR(5) NOT NULL,
    "groupCode" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10Mortality1_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10Mortality2" (
    "code" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10Mortality2_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10MortalityGroup3" (
    "code" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10MortalityGroup3_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10Mortality3" (
    "code" VARCHAR(5) NOT NULL,
    "groupCode" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10Mortality3_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10Mortality4" (
    "code" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Icd10Mortality4_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Icd10Code" (
    "Code" VARCHAR(7) NOT NULL,
    "Ebene" VARCHAR(1) NOT NULL,
    "Ort" VARCHAR(1) NOT NULL,
    "Art" VARCHAR(1) NOT NULL,
    "KapNr" VARCHAR(2) NOT NULL,
    "GrVon" VARCHAR(3) NOT NULL,
    "NormCode" VARCHAR(6) NOT NULL,
    "CodeOhnePunkt" VARCHAR(5) NOT NULL,
    "Titel" VARCHAR(255) NOT NULL,
    "Dreisteller" VARCHAR(255) NOT NULL,
    "Viersteller" VARCHAR(255),
    "Fuenfsteller" VARCHAR(255),
    "P295" VARCHAR(1) NOT NULL,
    "P301" VARCHAR(1) NOT NULL,
    "MortL1Code" VARCHAR(5) NOT NULL,
    "MortL2Code" VARCHAR(5) NOT NULL,
    "MortL3Code" VARCHAR(5) NOT NULL,
    "MortL4Code" VARCHAR(5) NOT NULL,
    "MorbLCode" VARCHAR(5) NOT NULL,
    "SexCode" VARCHAR(1) NOT NULL,
    "SexFehlerTyp" VARCHAR(1) NOT NULL,
    "AltUnt" VARCHAR(4) NOT NULL,
    "AltOb" VARCHAR(4) NOT NULL,
    "AltFehlerTyp" VARCHAR(1) NOT NULL,
    "Exot" VARCHAR(1) NOT NULL,
    "Belegt" VARCHAR(1) NOT NULL,
    "IfSGMeldung" VARCHAR(1) NOT NULL,
    "IfSGLabor" VARCHAR(1) NOT NULL,

    CONSTRAINT "Icd10Code_pkey" PRIMARY KEY ("Code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Icd10MortalityGroup3_code_key" ON "Icd10MortalityGroup3"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Icd10Code_NormCode_key" ON "Icd10Code"("NormCode");

-- CreateIndex
CREATE UNIQUE INDEX "Icd10Code_CodeOhnePunkt_key" ON "Icd10Code"("CodeOhnePunkt");

-- AddForeignKey
ALTER TABLE "Icd10Group" ADD CONSTRAINT "Icd10Group_chapterCode_fkey" FOREIGN KEY ("chapterCode") REFERENCES "Icd10Chapter"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Mortality1" ADD CONSTRAINT "Icd10Mortality1_groupCode_fkey" FOREIGN KEY ("groupCode") REFERENCES "Icd10MortalityGroup1"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Mortality3" ADD CONSTRAINT "Icd10Mortality3_groupCode_fkey" FOREIGN KEY ("groupCode") REFERENCES "Icd10MortalityGroup3"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Code" ADD CONSTRAINT "Icd10Code_KapNr_fkey" FOREIGN KEY ("KapNr") REFERENCES "Icd10Chapter"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Code" ADD CONSTRAINT "Icd10Code_GrVon_fkey" FOREIGN KEY ("GrVon") REFERENCES "Icd10Group"("groupFrom") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Code" ADD CONSTRAINT "Icd10Code_MortL1Code_fkey" FOREIGN KEY ("MortL1Code") REFERENCES "Icd10Mortality1"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Code" ADD CONSTRAINT "Icd10Code_MortL2Code_fkey" FOREIGN KEY ("MortL2Code") REFERENCES "Icd10Mortality2"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Code" ADD CONSTRAINT "Icd10Code_MortL3Code_fkey" FOREIGN KEY ("MortL3Code") REFERENCES "Icd10Mortality3"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Code" ADD CONSTRAINT "Icd10Code_MortL4Code_fkey" FOREIGN KEY ("MortL4Code") REFERENCES "Icd10Mortality4"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icd10Code" ADD CONSTRAINT "Icd10Code_MorbLCode_fkey" FOREIGN KEY ("MorbLCode") REFERENCES "Icd10Morbidity"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
