/*
  Warnings:

  - You are about to drop the `pets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_petId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_shelterId_fkey";

-- DropTable
DROP TABLE "pets";

-- CreateTable
CREATE TABLE "PetShelter" (
    "id" UUID NOT NULL,
    "petId" UUID NOT NULL,
    "shelterId" UUID NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetShelter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PetShelter_petId_shelterId_idx" ON "PetShelter"("petId", "shelterId");

-- AddForeignKey
ALTER TABLE "PetShelter" ADD CONSTRAINT "PetShelter_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetShelter" ADD CONSTRAINT "PetShelter_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
