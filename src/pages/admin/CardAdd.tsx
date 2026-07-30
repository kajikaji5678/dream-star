import { useState } from "react";
import Layout from "../../layouts/Layout";
import AdminTitle from "./AdminTitle";
import type { CardFormData } from "../../types/card";
import { submitCard } from "../../service/cardService";
import CardForm from "../../components/CardForm";


export default function CardAdd() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [card, setCard] = useState<CardFormData>({
    imageUrl: "",
    name: "",
    rarity: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  // カード登録処理
  const handleSubmit = async () => {
    setError("");
    try {
      await submitCard(card, imageFile);
      alert("カードを登録しました");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  }

  return (
    <Layout>
      <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
        <AdminTitle title="カード追加" />
        <CardForm
          card={card}
          setCard={setCard}
          imageFile={imageFile}
          setImageFile={setImageFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          error={error}
          buttonText="追加する"
          onSubmit={handleSubmit}
        />
      </section>
    </Layout>
  )
}