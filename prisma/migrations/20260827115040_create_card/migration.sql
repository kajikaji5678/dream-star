-- CreateTable
CREATE TABLE "CardAbility" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CardAbility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CardAbility" ADD CONSTRAINT "CardAbility_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
