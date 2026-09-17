import type { Effect } from "@/pages/admin/AbilityEditor/AbilityEffect";

export async function saveEffect(
  effectId: number | null, abilityId: number, body: Effect
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