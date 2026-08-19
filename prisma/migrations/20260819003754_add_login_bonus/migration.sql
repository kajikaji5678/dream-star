-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginDate" TIMESTAMP(3),
ADD COLUMN     "loginStreak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "LoginBonusClaim" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "loginDate" DATE NOT NULL,

    CONSTRAINT "LoginBonusClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginBonusClaim_userId_loginDate_key" ON "LoginBonusClaim"("userId", "loginDate");

-- AddForeignKey
ALTER TABLE "LoginBonusClaim" ADD CONSTRAINT "LoginBonusClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
