import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { saveEffect } from "@/service/CMSService";
import { useEffect, useState } from "react";
import EffectForm from "./EffectForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  onBack: () => void;
  abilityId: number;
}

export type Effect = {
  effectId: number | null;
  effectType: string | null;
  specialStatus: string | null;
  target: string | null;
  valueNumber: string;
  coinResult: string | null;
  position: string | null;
}

export type EffectResponse = {
  id: number;
  effectType: string | null;
  specialStatus: string | null;
  target: string | null;
  valueNumber: number | null;
  coinResult: string;
  position: string;
};

export type EffectRequest = {
  effectType: string | null;
  specialStatus: string | null;
  target: string | null;
  valueNumber: number | null;
  coinResult: string | null;
  position: string | null;
};

const emptyEffect: Effect = {
  effectId: null,
  effectType: "",
  specialStatus: "",
  target: "",
  valueNumber: "",
  coinResult: "",
  position: "",
}

export default function AbilityEffect({ onBack, abilityId }: Props) {

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [effects, setEffects] = useState<Effect[]>([{ ...emptyEffect }, { ...emptyEffect }]);
  const [activeEffect, setActiveEffect] = useState(0);

  useEffect(() => {
    async function fetchEffect() {
      try {
        const res = await fetch(`/api/details/${abilityId}/effects`);
        if (!res.ok) throw new Error("効果の取得失敗");
        const data: EffectResponse[] = await res.json();

        const fetchedEffects: Effect[] = data.map((effect) => ({
          effectId: effect.id,
          effectType: effect.effectType ?? "",
          specialStatus: effect.specialStatus ?? "",
          target: effect.target ?? "",
          valueNumber: effect.valueNumber !== null ? String(effect.valueNumber) : "",
          coinResult: effect.coinResult ?? "",
          position: effect.position ?? "",
        }));
        while (fetchedEffects.length < 2) fetchedEffects.push({ ...emptyEffect });
        setEffects(fetchedEffects);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
    fetchEffect();
  }, [abilityId])

  const handleSave = async () => {
    const effect = effects[activeEffect];
    const body = {
      id: effect.effectId,
      effectType: effect.effectType,
      specialStatus: effect.effectType === "special" ? effect.specialStatus : null,
      target: effect.target,
      valueNumber: effect.valueNumber === "" ? null : Number(effect.valueNumber),
      coinResult: effect.coinResult,
      position: effect.position,
    };

    try {
      const data = await saveEffect(effect.effectId, abilityId, body);
      setEffects((prev) =>
        prev.map((item, index) =>
          index === activeEffect ? { ...item, effectId: data.id, } : item));
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

      {success && (
        <p className="text-sm text-green-400">
          {success}
        </p>
      )}

      <CardContent className="mt-2 overflow-y-auto">
        <Tabs
          value={String(activeEffect)}
          onValueChange={(value) => setActiveEffect(Number(value))}
          className="mt-2 flex flex-col"
        >
          <TabsList className="p-1 mt-2 bg-gray-300">
            {effects.map((_, index) => (
              <TabsTrigger
                key={index}
                value={String(index)}
                className="[&[data-active]]:text-black [&[data-active]]:bg-gray-100"
              >
                効果 {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {effects.map((effect, index) => (
            <TabsContent
              key={index}
              value={String(index)}
              className="mt-4 space-y-6"
            >
              <EffectForm
                effect={effect}
                onChange={updateEffect}
              />
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-6">
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
        </div>
      </CardContent>
    </Card>
  )
}