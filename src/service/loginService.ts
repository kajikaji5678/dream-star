export async function updateLoginFront(userId: string) {
  const res = await fetch(`/api/login/put/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message ?? "ログイン情報の更新失敗");
  return data;
}

export async function getLoginFront(userId: string) {
  const res = await fetch(`/api/login/get/${userId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "ログイン情報の取得失敗");
  return data;
}