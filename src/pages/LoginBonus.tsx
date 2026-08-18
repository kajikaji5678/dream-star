import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "@base-ui/react/button";
import { useEffect, useState } from "react";

const loginRewards = [
  { day: 1, reward: 50, status: "received" },
  { day: 2, reward: 50, status: "received" },
  { day: 3, reward: 100, status: "current" },
  { day: 4, reward: 100, status: "locked" },
  { day: 5, reward: 100, status: "locked" },
  { day: 6, reward: 150, status: "locked" },
  { day: 7, reward: 150, status: "locked" }
];

export default function LoginBonus() {
  const loginDays = 3;

  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    if (step !== 1) return;

    const timer = setTimeout(() => {
      setStep(2)
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [step]);

  return (
    <div className="h-screen text-white">
      <div className="mx-auto mt-4 h-[90vh] w-[90vw]">
        <Card className="h-full w-full border-0 px-4 py-8 bg-[#2b2d31] text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              ログインボーナス
            </CardTitle>
            <CardDescription className="text-[#b5bac1]">
              毎日ログインして報酬を受け取ろう
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 overflow-y-auto">
            {/* 連続ログイン */}
            {step === 1 && (
              <section className="rounded-lg bg-[#232428] p-5 mt-4">
                <div>
                  <p className="text-sm text-[#b5bac1]">
                    連続ログイン
                  </p>
                  <p className="text-2xl font-bold">
                    {loginDays}日目
                  </p>
                  <span className="text-3xl">🔥</span>
                </div>
                <Progress value={(loginDays / 7) * 100} className="h-2" />
                <p className="mt-2 text-right text-xs text-[#949ba4]">
                  {loginDays} / 7 日
                </p>
              </section>
            )}

            {/* ログイン報酬 */}
            {step === 2 && (
              <section className="mt-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    ログイン報酬
                  </h2>
                  <p className="mt-1 text-sm text-[#949ba4]">
                    7日間ログインするとすべての報酬を獲得できます
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                  {loginRewards.map((item) => {
                    return (
                      <div
                        key={item.day}
                        onClick={item.status === "current" ? () => setStep(3) : undefined}
                        className={`lounded-lg border p-4 text-center
                    transition${item.status === "current" ? "border-[#5865f2] bg-[#404249]" : "border-[#1e1f22] bg-[#232428]"}`}>
                        <p className="text-xs font-medium text-[#949ba4]">
                          {item.day}日目
                        </p>
                        <div className="my-2 text-2xl">
                          {item.status === "received" && "✅"}
                          {item.status === "current" && "🎁"}
                          {item.status === "locked" && "🔐"}
                        </div>
                        <p className="font-semibold">
                          {item.reward}
                        </p>
                        <p className="text-xs text-[#949ba4]">
                          DGP
                        </p>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* 今日の報酬 */}
            {step === 3 && (
              <section className="rounded-lg bg-[#232428] p-6 text-center">
                <p className="text-sm font-medium text-[#b5bac1]">
                  今日の報酬
                </p>
                <div className="my-5">
                  <div className="text-5xl">💎</div>
                  <p className="mt-3 text-2xl font-bold">100 DGP</p>
                </div>
                <Button className="w-1/2 p-4 rounded-md bg-[#5865f2] hover:bg-[#4752c4]">
                  報酬を受け取る
                </Button>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}