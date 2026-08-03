import type { CardFormData } from "../types/card";

const API_URL = import.meta.env.VITE_API_URL;

// カード登録
export async function submitCard(
  card: CardFormData,
  imageFile: File | null
) {

  if (!card.name.trim()) {
    throw new Error("カード名を入力してください");
  }

  if (!imageFile) {
    throw new Error("画像を入力してください");
  }

  if (!card.rarity.trim()) {
    throw new Error("レア度を入力してください");
  }

  const formData = new FormData();
  formData.append("file", imageFile);

  const uploadRes = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });


  const uploadData = await uploadRes.json();

  if (!uploadRes.ok) {
    throw new Error(`[upload] ${uploadData.error ?? "画像アップロードに失敗"}`);
  }

  const res = await fetch(`${API_URL}/api/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...card,
      imageUrl: uploadData.imageUrl,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`[cards] ${data.error ?? "登録に失敗しました"}`);
  }

  return data;
}

// 編集画面にてカード情報取得
export async function getCard(id: string) {
  const res = await fetch(`${API_URL}/api/cards/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
}

// カード情報更新
export async function updateCard(
  id: string,
  card: CardFormData,
  imageFile: File | null
) {

  let imageUrl = card.imageUrl;

  if (imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const uploadRes = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      throw new Error(
        uploadData.error ?? "画像アップロードに失敗しました"
      );
    }

    imageUrl = uploadData.imageUrl;
  }

  const res = await fetch(`${API_URL}/api/cards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...card, imageUrl}),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
}

// カード削除
export async function deleteCard(id: string) {
  const res = await fetch(`${API_URL}/api/cards/${id}`, {
    method: "DELETE",
  }) ;

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
}