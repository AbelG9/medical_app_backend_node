/*
  Warnings:

  - You are about to drop the column `sexName` on the `persons` table. All the data in the column will be lost.
  - Made the column `lastname` on table `persons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "office_number" DROP NOT NULL,
ALTER COLUMN "details" DROP NOT NULL;

-- AlterTable
ALTER TABLE "persons" DROP COLUMN "sexName",
ADD COLUMN     "sex" TEXT,
ALTER COLUMN "lastname" SET NOT NULL;

-- AlterTable
ALTER TABLE "specialties" ALTER COLUMN "code" DROP NOT NULL;
