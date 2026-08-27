-- CreateTable
CREATE TABLE "AbilityCondition" (
    "id" SERIAL NOT NULL,
    "abilityId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT,
    "valueNumber" INTEGER,

    CONSTRAINT "AbilityCondition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AbilityCondition" ADD CONSTRAINT "AbilityCondition_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES "CardAbility"("id") ON DELETE CASCADE ON UPDATE CASCADE;
