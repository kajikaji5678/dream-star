import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select"
import { useEffect, useState } from "react";
import type { Condition } from "@/types/card";

type Props = {
  abilityId: number;
  onBack: () => void
}

export default function AbilityCondition({ onBack, abilityId }: Props) {

  const [conditionId, setConditionId] = useState<number | null>(null);
  const [activationTiming, setActivationTimig] = useState("");
  const [target, setTarget] = useState("");
  const [valueNumber, setValueNumber] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCondition() {
      try {
        const res = await fetch(`/api/abilities/${abilityId}/conditions`);
        if (!res.ok) throw new Error("条件の取得に失敗しました");

        const data: Condition[] = await res.json();
        const condition = data[0];
        if (!condition) return;
        setConditionId(condition.id);
        setActivationTimig(condition.activationTiming ?? "");
        setTarget(condition.target ?? "");
        setValueNumber(condition.valueNumber !== null ? String(condition.valueNumber) : "");
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
    fetchCondition()
  }, [abilityId])

  const handleSave = async () => {
    setError("");
    setSuccess("");

    try {
      const body = {
        activationTiming,
        target,
        valueNumber: valueNumber === "" ? null : Number(valueNumber)
      };

      let response;

      if (conditionId !== null) {
        response = await fetch(`/api/abilities/conditions/${conditionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      } else {
        response = await fetch(`/api/abilities/${abilityId}/conditions`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      }
      if (!response.ok) throw new Error("条件の保存失敗");
      const data: Condition = await response.json();
      setConditionId(data.id);
      setSuccess("条件を保存しました。")
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  }

  return (
    <Card className="border-0 bg-[#232428] text-white p-2 mt-2">
      <CardHeader className="text-lg">
        発動条件
      </CardHeader>

      {error && (
        <p className="text-red-400"> {error} </p>
      )}
      {success && (
        <p className="text-green-400"> {success} </p>
      )}

      <CardContent className="mt-2 space-y-6">
        <div className="space-y-2">
          <Label className="text-base">発動タイミング</Label>
          <Select
            value={activationTiming}
            onValueChange={(value) => setActivationTimig(value ?? "")}
          >
            <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
              <SelectValue placeholder="発動タイミングを選択します"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on_play">
                登場時
              </SelectItem>
              <SelectItem value="on_attack">
                攻撃時
              </SelectItem>
              <SelectItem value="on_damage">
                ダメージを受けた時
              </SelectItem>
              <SelectItem value="on_turn_start">
                ターン開始時
              </SelectItem>
              <SelectItem value="on_turn_end">
                ターン終了時
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base">判定対象</Label>
          <Select 
          value={target}
          onValueChange={(value) => setTarget(value ?? "")}>
            <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
              <SelectValue placeholder="対象を選択します"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self">
                自分
              </SelectItem>
              <SelectItem value="ally_only">
                自分以外の味方一人
              </SelectItem>
              <SelectItem value="ally_all">
                味方全体
              </SelectItem>
              <SelectItem value="enemy_self">
                相手
              </SelectItem>
              <SelectItem value="enemy_only">
                敵の一人
              </SelectItem>
              <SelectItem value="enemy_all">
                敵全体
              </SelectItem>
              <SelectItem value="all">
                全員
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base">条件</Label>
          <Input
            type="number"
            placeholder="例: 50"
            value={valueNumber}
            onChange={(e) => setValueNumber(e.target.value)}
            className="border-[#1e1f22] bg-[#a4a4a5] text-whit"
          />
        </div>
        <Button
          variant="outline"
          className="bg-blue-200 hover:bg-blue-400 text-black"
          onClick={handleSave}
        >
          条件を保存する
        </Button>
        <Button
          variant="outline"
          className="ml-2 bg-blue-200 hover:bg-blue-400 text-black"
          onClick={onBack}
        >
          保存せずに戻る
        </Button>
      </CardContent>
    </Card>
  )
}