/*
  Warnings:

  - You are about to drop the `PetUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "AdoptionStatus" ADD VALUE 'UNDER_CONSIDERATION';

-- DropForeignKey
ALTER TABLE "PetUser" DROP CONSTRAINT "PetUser_petId_fkey";

-- DropForeignKey
ALTER TABLE "PetUser" DROP CONSTRAINT "PetUser_userId_fkey";

-- AlterTable
ALTER TABLE "AdoptionUser" ADD COLUMN     "isCurrentUser" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "PetUser";
