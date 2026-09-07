/*
  Warnings:

  - You are about to drop the column `type` on the `AbilityCondition` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `AbilityCondition` table. All the data in the column will be lost.
  - You are about to drop the column `attribute` on the `abilityEffect` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `abilityEffect` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `abilityEffect` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `abilityEffect` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `abilityEffect` table. All the data in the column will be lost.
  - You are about to drop the column `valueText` on the `abilityEffect` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AbilityCondition" DROP COLUMN "type",
DROP COLUMN "value",
ADD COLUMN     "ActivationTiming" TEXT,
ADD COLUMN     "target" TEXT;

-- AlterTable
ALTER TABLE "abilityEffect" DROP COLUMN "attribute",
DROP COLUMN "destination",
DROP COLUMN "duration",
DROP COLUMN "status",
DROP COLUMN "type",
DROP COLUMN "valueText",
ADD COLUMN     "effectType" TEXT,
ADD COLUMN     "specialStatus" TEXT;
