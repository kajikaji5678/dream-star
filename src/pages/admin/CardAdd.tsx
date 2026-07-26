import { useState } from "react";
import Layout from "../../layouts/Layout";
import AdminTitle from "./AdminTitle";

const API_URL = import.meta.env.VITE_API_URL

type CardInfo = {
  label: string;
  key: keyof CardForm;
}

type CardForm = {
  imageUrl: string;
  name: string;
  rarity: string;
}

export default function CardAdd() {

  const [card, setCard] = useState<CardForm>({
    imageUrl: "",
    name: "",
    rarity: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const cardInfo: CardInfo[] = [
    { label: "画像URL", key: "imageUrl" },
    { label: "名前", key: "name" },
    { label: "レア度", key: "rarity" },
  ];

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!card.name.trim()) {
      setError("カード名を入力してください");
      return;
    }

    if (!imageFile) {
      setError("画像を入力してください")
      return;
    }

    if (!card.rarity.trim()) {
      setError("レア度を入力してください")
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    const uploadRes = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      setError(uploadData.error ?? "画像アップロードに失敗");
      return;
    }

    const res = await fetch(`${API_URL}/api/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...card, imageUrl: uploadData.imageUrl})
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "登録に失敗しました");
      return;
    }

    alert("カードを登録しました！");
  }

  return (
    <Layout>
      <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
        <AdminTitle title="カード追加" />

        <div className="mt-4 flex-1 rounded-lg bg-black/20 p-6">
          <div className="grid grid-cols-3 gap-6">

            <div className="col-span-1">
              <div className="rounded-lg bg-black/30 p-4">
                <img
                  src={previewUrl}
                  className="w-full aspect-square object-cover rounded-lg"></img>
              </div>
            </div>

            <div className="col-span-2">
              <table className="w-full text-white">
                <tbody>
                  {cardInfo.map((item) => (
                    <tr className="border-b border-white/20">
                      <th className="text-left p-3 w-1/3">
                        {item.label}
                      </th>
                      <td className="p-3">
                        {item.key === "imageUrl" ? (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setImageFile(file);
                              setPreviewUrl(URL.createObjectURL(file));
                            }}
                            className="bg-black/30 rounded px-3 py-2 w-full" />
                        ) : (
                          <input 
                            value={card[item.key]}
                            onChange={(e) => setCard({...card, [item.key]:e.target.value})}
                            className="bg-black/30 rounded px-3 py-2 w-full" 
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && (
                <p className="mt-3 text-red-400">{error}</p>
              )}
              <div className="mt-4 flex justify-center">
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  追加する
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}