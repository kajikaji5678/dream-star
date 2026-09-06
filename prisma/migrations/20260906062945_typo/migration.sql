/*
  Warnings:

  - You are about to drop the column `ActivationTiming` on the `AbilityCondition` table. All the data in the column will be lost.
  - You are about to drop the `abilityEffect` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "abilityEffect" DROP CONSTRAINT "abilityEffect_abilityId_fkey";

-- AlterTable
ALTER TABLE "AbilityCondition" DROP COLUMN "ActivationTiming",
ADD COLUMN     "activationTiming" TEXT;

-- DropTable
DROP TABLE "abilityEffect";

-- CreateTable
CREATE TABLE "AbilityEffect" (
    "id" SERIAL NOT NULL,
    "abilityId" INTEGER NOT NULL,
    "effectType" TEXT,
    "specialStatus" TEXT,
    "target" TEXT,
    "valueNumber" INTEGER,

    CONSTRAINT "AbilityEffect_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AbilityEffect" ADD CONSTRAINT "AbilityEffect_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES "CardAbility"("id") ON DELETE CASCADE ON UPDATE CASCADE;
