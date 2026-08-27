-- CreateTable
CREATE TABLE "abilityEffect" (
    "id" SERIAL NOT NULL,
    "abilityId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "target" TEXT,
    "valueNumber" INTEGER,
    "valueText" TEXT,
    "attribute" TEXT,
    "status" TEXT,
    "destination" TEXT,
    "duration" TEXT,

    CONSTRAINT "abilityEffect_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "abilityEffect" ADD CONSTRAINT "abilityEffect_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES "CardAbility"("id") ON DELETE CASCADE ON UPDATE CASCADE;
