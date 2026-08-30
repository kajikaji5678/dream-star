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
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AbilityCondition from "./AbilityEditor/AbilityCondition";
import AbilityEffect from "./AbilityEditor/AbilityEffect";

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
  const [selectedAvilityId, setSelectedAvilityId] = useState<number | null>(null);

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
        {selectedAvilityId === null && (
          <Tabs
            defaultValue="info"
            className="mt-2 flex min-h-0 flex-1 flex-col"
          >
            <TabsList className="p-1 bg-gray-300">
              <TabsTrigger value="info" className="[&[data-active]]:text-black [&[data-active]]:bg-gray-100">
                基本情報
              </TabsTrigger>
              <TabsTrigger value="ability" className="[&[data-active]]:text-black [&[data-active]]:bg-gray-100">
                能力
              </TabsTrigger>
            </TabsList>

            {/* // カード情報のコンテンツ */}
            <TabsContent
              value="info"
              className="min-h-0 flex-1 mt-0 overflow-y-auto"
            >
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

            {/* // カード効果のコンテンツ */}
            <TabsContent
              value="ability"
              className="min-h-0 flex-1 mt-0 overflow-y-auto"
            >
              <div className="space-y-3">
                <Card className="border-white/10 bg-black/20 p-2">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">
                      効果1
                    </CardTitle>
                    <CardDescription className="text-white">
                      相手に3ダメージ与える
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="mt-2 flex justify-end bg-transparent pt-2">
                    <Button
                      variant="outline"
                      className="bg-blue-200 hover:bg-blue-400"
                      onClick={() => setSelectedAvilityId(0)}>
                      編集
                    </Button>
                    <Button variant="outline" className="ml-2 bg-red-200 hover:bg-red-400">
                      削除
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

          </Tabs>
        )}
        {selectedAvilityId !== null && (
          // <AbilityCondition />
          <AbilityEffect />
        )}
      </section>
    </Layout>
  );
}