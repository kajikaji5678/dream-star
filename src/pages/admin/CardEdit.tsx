import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import AdminTitle from "./AdminTitle";
import CardForm from "../../components/CardForm";
import type { CardFormData } from "../../types/card";
import { getCard } from "../../service/cardService";
import { updateCard } from "../../service/cardService";
import { deleteCard } from "../../service/cardService";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CardEdit() {

  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState<CardFormData>({
    imageUrl: "",
    name: "",
    rarity: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchCard() {
      if (!id) return;

      try {
        const data = await getCard(id);

        setCard({
          imageUrl: data.imageUrl,
          name: data.name,
          rarity: data.rarity,
          hp: data.hp,
          attack: data.attack,
          escapePoint: data.escapePoint,
          category: data.category,
          consumePoint: data.consumePoint,
          supportType: data.supportType
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
    if (!id) return;
    setError("");
    try {
      await updateCard(id, card, imageFile);
      setSuccess("更新しました");
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteCard(id);
      setSuccess("削除しました");
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <Layout>
      <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
        <AdminTitle title="カード編集" />
        <Tabs defaultValue="info" className="flex-1">
          <TabsList>
            <TabsTrigger value="info">基本情報</TabsTrigger>
            <TabsTrigger value="ability">能力</TabsTrigger>
            <TabsContent value="info">
              <CardForm
                card={card}
                setCard={setCard}
                setImageFile={setImageFile}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                error={error}
                success={success}
                buttonText="更新する"
                onSubmit={handleSubmit}
              >
                <button
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleDelete}
                >
                  削除する
                </button>
              </CardForm>
            </TabsContent>

            <TabsContent value="ability">
              <div>能力編集</div>
            </TabsContent>
          </TabsList>
        </Tabs>
      </section>
    </Layout>
  );
}