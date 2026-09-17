import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { saveEffect } from "@/service/CMSService";
import { useEffect, useState } from "react";
import EffectForm from "./EffectForm";

type Props = {
  onBack: () => void;
  abilityId: number;
}

export type Effect = {
  effectId: number | null;
  effectType: string | null;
  specialStatus: string | null;
  target: string | null;
  valueNumber: string | null;
}

const emptyEffect: Effect = {
  effectId: null,
  effectType: "",
  specialStatus: "",
  target: "",
  valueNumber: "",
}

export default function AbilityEffect({ onBack, abilityId }: Props) {

  const [effectId, setEffectId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [effects, setEffects] = useState<Effect[]>([emptyEffect]);
  const [activeEffect, setActiveEffect] = useState(0);

  useEffect(() => {
    async function fetchEffect() {
      try {
        const res = await fetch(`/api/details/${abilityId}/effects`);
        if (!res.ok) throw new Error("効果の取得失敗");
        const data = await res.json();
        if (!data || data.length === 0) return;

        const effects: Effect[] = data.map((effect: Effect) => ({
          effectId: effect.effectId,
          effectType: effect.effectType ?? "",
          specialStatus: effect.specialStatus ?? "",
          target: effect.target ?? "",
          valueNumber: effect.valueNumber !== null ? String(effect.valueNumber) : "",
        }))
        setEffects(effects);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
    fetchEffect();
  }, [abilityId])

  const handleSave = async () => {
    const effect = effects[activeEffect];
    const body = {
      effectId: effect.effectId,
      effectType: effect.effectType,
      specialStatus: effect.effectType === "special" ? effect.specialStatus : null,
      target: effect.target,
      valueNumber: effect.valueNumber === "" ? null : String(effect.valueNumber)
    };

    try {
      const data = await saveEffect(effectId, abilityId, body);
      setEffectId(data.id);
      setSuccess("効果を保存しました");
      setTimeout(() => {
        onBack();
      }, 2000)
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  }

  const updateEffect = (key: keyof Effect, value: string) => {
    setEffects(prev =>
      prev.map((effect, index) =>
        index === activeEffect ? { ...effect, [key]: value } : effect
      )
    )
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
        <EffectForm
          effect={effects[activeEffect]}
          onChange={updateEffect}
        />
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