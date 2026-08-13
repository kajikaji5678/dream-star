export const drawGacha = async (userId: string) => {
  const res = await fetch("/api/gacha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });

  if (!res.ok) {
    throw new Error("ガチャに失敗しました");
  }

  return await res.json();
};

export const drawTenGacha = async (userId: string) => {
  const res = await fetch("/api/gacha/ten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });

  if (!res.ok) {
    throw new Error(`ガチャに失敗しました: ${res.status}`);
  }

  return await res.json();
};