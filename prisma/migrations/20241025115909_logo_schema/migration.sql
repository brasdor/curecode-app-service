-- CreateTable
CREATE TABLE "Logo" (
    "id" SERIAL NOT NULL,
    "imageData" BYTEA NOT NULL,
    "organisationId" INTEGER NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
