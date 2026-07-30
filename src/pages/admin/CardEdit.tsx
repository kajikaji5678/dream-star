import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import AdminTitle from "./AdminTitle";
import CardForm from "../../components/CardForm";
import type { CardFormData } from "../../types/card";
import { getCard } from "../../service/cardService";

export default function CardEdit() {

  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [card, setCard] = useState<CardFormData>({
    imageUrl: "",
    name: "",
    rarity: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCard() {
      if (!id) return;

      try {
        const data = await getCard(id);

        setCard({
          imageUrl: data.imageUrl,
          name: data.name,
          rarity: data.rarity
        });

        setPreviewUrl(`${API_URL}${data.imageUrl}`);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }

    fetchCard();
  }, [id, API_URL]);

  const handleSubmit = async () => {
    // TODO: PUT /api/cards/:id
    alert("更新処理");
  };

  return (
    <Layout>
      <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
        <AdminTitle title="カード編集" />

        <CardForm
          card={card}
          setCard={setCard}
          setImageFile={setImageFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          error={error}
          buttonText="更新する"
          onSubmit={handleSubmit}
        />
      </section>
    </Layout>
  );
}