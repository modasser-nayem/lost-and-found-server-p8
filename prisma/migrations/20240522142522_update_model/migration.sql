/*
  Warnings:

  - You are about to drop the column `lostDate` on the `found_items` table. All the data in the column will be lost.
  - You are about to drop the column `lostLocation` on the `found_items` table. All the data in the column will be lost.
  - Added the required column `foundDate` to the `found_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foundLocation` to the `found_items` table without a default value. This is not possible if the table is not empty.
  - Made the column `lostDate` on table `lost_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lostLocation` on table `lost_items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "found_items" DROP COLUMN "lostDate",
DROP COLUMN "lostLocation",
ADD COLUMN     "foundDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "foundLocation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lost_items" ALTER COLUMN "lostDate" SET NOT NULL,
ALTER COLUMN "lostLocation" SET NOT NULL;
