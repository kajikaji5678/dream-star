-- CreateTable
CREATE TABLE "DGPRewardClaim" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardKey" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DGPRewardClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DGPRewardClaim_userId_rewardKey_key" ON "DGPRewardClaim"("userId", "rewardKey");
