type EffectBody = {
  abilityId: number;
  effectType: string;
  specialStatus: string | null;
  target: string;
  valueNumber: number | null;
};

export async function saveEffect(
  effectId: number | null, abilityId: number, body: EffectBody
) {
  const url = effectId ? `/api/details/effects/${effectId}` : `/api/details/${abilityId}/effects`;
  const method = effectId ? "PUT" : "POST";
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("効果の保存に失敗しました");

  return response.json();
}