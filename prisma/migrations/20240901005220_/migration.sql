-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- AlterTable
ALTER TABLE "PetShelter" ADD COLUMN     "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING';
