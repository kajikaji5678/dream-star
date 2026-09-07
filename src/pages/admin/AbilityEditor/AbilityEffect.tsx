import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select"
import { useEffect, useState } from "react";

type Props = {
  onBack: () => void;
  abilityId: number;
}

export default function AbilityEffect({ onBack, abilityId }: Props) {

  const [effectId, setEffectId] = useState<number | null>(null);
  const [isSpecialOpen, setIsSpecialOpen] = useState(false);
  const [effectType, setEffectType] = useState("");
  const [specialStatus, setSpecialStatus] = useState("");
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [valueNumber, setValueNumber] = useState("");

  useEffect(() => {
    async function fetchEffect() {
      try {
        const res = await fetch(`/api/details/${abilityId}/effects`);
        if (!res.ok) throw new Error("効果の取得失敗");
        const effec = await res.json();
        if (!effec) return;
        const effect = effec[0]
        setEffectId(effect.id);
        setEffectType(effect.effectType ?? "");
        setSpecialStatus(effect.specialStatus ?? "");
        setIsSpecialOpen(effect.effectType === "special");
        setTarget(effect.target ?? "");
        setValueNumber(effect.valueNumber !== null ? String(effect.valueNumber) : "");
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
    fetchEffect();
  }, [abilityId])

  const handleSave = async () => {
    const body = {
      abilityId,
      effectType,
      specialStatus: effectType === "special" ? specialStatus : null,
      target,
      valueNumber: valueNumber === "" ? null : Number(valueNumber)
    };

    try {
      let response;
      if (effectId != null) {
        response = await fetch(`/api/details/effects/${effectId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
      } else {
        response = await fetch(`/api/details/${abilityId}/effects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
      }
      if (!response.ok) throw new Error("効果の保存失敗");

      const data = await response.json();
      setEffectId(data.id);
      setSuccess("効果を保存しました");

      if (response?.ok) {
        setTimeout(() => {
          onBack();
        }, 2000)
      }
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  }

  return (
    <Card className="border-0 bg-[#232428] text-white p-2 mt-2">
      <CardHeader className="text-lg">
        エフェクト
      </CardHeader>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      {/* 成功 */}
      {success && (
        <p className="text-sm text-green-400">
          {success}
        </p>
      )}

      <CardContent className="mt-2 space-y-6">
        <div className="space-y-2">
          <Label className="text-base">効果の種類</Label>
          <Select
            value={effectType}
            onValueChange={(value) => { setIsSpecialOpen(value === "special"); setEffectType(value ?? ""); if (value !== "special") setSpecialStatus("") }}>
            <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
              <SelectValue placeholder="種類を選択"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="damage">
                ダメージ
              </SelectItem>
              <SelectItem value="heal">
                回復
              </SelectItem>
              <SelectItem value="special">
                特殊状態
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isSpecialOpen && (
          <div className="space-y-2">
            <Label className="text-base">特殊効果の内容を指定</Label>
            <Select
              value={specialStatus}
              onValueChange={(value) => setSpecialStatus(value ?? "")}
            >
              <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
                <SelectValue placeholder="種類を選択"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poison">
                  毒
                </SelectItem>
                <SelectItem value="stan">
                  スタン
                </SelectItem>
                <SelectItem value="ghost">
                  呪い
                </SelectItem>
                <SelectItem value="rock_on">
                  ロックオン
                </SelectItem>
                <SelectItem value="explotion">
                  爆破
                </SelectItem>
                <SelectItem value="not_move">
                  行動不能
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-base">効果対象</Label>
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
          <Label className="text-base">数値</Label>
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