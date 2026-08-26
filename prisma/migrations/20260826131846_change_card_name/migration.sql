/*
  Warnings:

  - The `HP` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attack` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `consumePoint` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `escapePoint` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "HP",
ADD COLUMN     "HP" INTEGER,
DROP COLUMN "attack",
ADD COLUMN     "attack" INTEGER,
DROP COLUMN "consumePoint",
ADD COLUMN     "consumePoint" INTEGER,
DROP COLUMN "escapePoint",
ADD COLUMN     "escapePoint" INTEGER;
