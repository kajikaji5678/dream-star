import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import AdminTitle from "./AdminTitle";
import CardForm from "../../components/CardForm";
import type { Ability, CardFormData } from "../../types/card";
import { getCard } from "../../service/cardService";
import { updateCard } from "../../service/cardService";
import { deleteCard } from "../../service/cardService";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AbilityCondition from "./AbilityEditor/AbilityCondition";
import AbilityEffect from "./AbilityEditor/AbilityEffect";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@base-ui/react/input";

export default function CardEdit() {

  type EditorType = "list" | "condition" | "effect";
  const [editorType, setEditorType] = useState<EditorType>("list");

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
  const [desc, setDesc] = useState("相手に3ダメージ与える");
  const [isAbilityAdding, setIsAbilityAdding] = useState(false);
  const [abilityName, setAbilityName] = useState("");
  const [abilityDesc, setAbilityDesc] = useState("");
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [editingAbilityId, setEditingAvilityId] = useState<number | null>(null);

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

        console.log(data);
        setPreviewUrl(`${API_URL}${data.imageUrl}`);
        setAbilities(data.abilities ?? []);
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

  const handleCreateAbility = async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/details/${id}/abilities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: abilityName,
          desc: abilityDesc
        })
      });

      if (!res.ok) throw new Error("能力の作成に失敗しました");
      const ability = await res.json();
      setAbilities((prev) => [...prev, ability]);
      setSelectedAvilityId(ability.id);
      setIsAbilityAdding(false);
      setAbilityName("");
      setAbilityDesc("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  const handleDeleteAbility = async (abilityId: number) => {
    try {
      const res = await fetch(`/api/details/abilities/${abilityId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("能力の削除に失敗しました");
      setAbilities((prev) => prev.filter((ability) => ability.id !== abilityId));
      if (selectedAvilityId === abilityId) setSelectedAvilityId(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  const handleUpdateAbility = async (abilityId: number) => {
    try {
      const res = await fetch(`/api/details/abilities/${abilityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: desc,
          name: abilityName
        })
      });
      if (!res.ok) throw new Error("能力の更新に失敗しました");
      const updateAbility = await res.json();
      setAbilities((prev) => prev.map((ability) => ability.id === abilityId ? updateAbility : ability));
      setSuccess("能力を更新しました");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  console.log(abilities);

  return (
    <Layout>
      <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
        <AdminTitle title="カード編集" />
        {editorType === "list" && (
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
                {abilities.map((ability, index) => (
                  <Card
                    key={ability.id}
                    className="border-white/10 bg-black/20 p-2"
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between text-white">
                        {editingAbilityId === ability.id ? (
                          <Input
                            value={abilityName}
                            onChange={(e) => setAbilityName(e.target.value)}
                            className="mr-2 tetx-black"
                          />
                        ) : (
                          <p className="font-bold text-xl">
                            効果{index + 1}: {ability.name}
                          </p>
                        )}
                        <Button
                          variant="outline"
                          className="bg-green-200 text-black hover:bg-green-400"
                          onClick={() => {
                            if (editingAbilityId === ability.id) {
                              handleUpdateAbility(ability.id);
                            } else {
                              setEditingAvilityId(ability.id);
                              setAbilityName(ability.name);
                              setDesc(ability.description ?? "");
                            }
                          }}
                        >
                          {editingAbilityId === ability.id ? "確定" : "説明欄"}
                        </Button>

                      </CardTitle>
                      {editingAbilityId === ability.id ? (
                        <Textarea
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          className="focus-visible:border-blue-500 focus-visible:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <CardDescription className="text-base text-white">
                          {ability.description}
                        </CardDescription>
                      )}
                    </CardHeader>

                    <CardFooter className="mt-2 flex justify-end bg-transparent pt-2">
                      <Button
                        variant="outline"
                        className="bg-blue-200 hover:bg-blue-400"
                        onClick={() => { setSelectedAvilityId(ability.id); setEditorType("condition") }}>
                        条件の編集
                      </Button>
                      <Button
                        variant="outline"
                        className="ml-2 bg-blue-200 hover:bg-blue-400"
                        onClick={() => { setSelectedAvilityId(ability.id); setEditorType("effect") }}>
                        効果の編集
                      </Button>
                      <Button
                        variant="outline"
                        className="ml-2 bg-red-200 hover:bg-red-400"
                        onClick={() => handleDeleteAbility(ability.id)}>
                        削除
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="bg-blue-200 hover:bg-blue-400 text-black"
                    onClick={() => setIsAbilityAdding(true)}
                  >
                    追加する
                  </Button>
                </div>
                {isAbilityAdding && (
                  <Card className="border-white/10 bg-black/20 p-2">
                    <CardHeader>
                      <CardTitle className="flex justify-between text-white">
                        <p className="font-bold text-xl">新しい能力</p>
                      </CardTitle>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-white mb-1">能力名</Label>
                          <Input
                            value={abilityName}
                            onChange={(e) => setAbilityName(e.target.value)}
                            placeholder="能力名を入力"
                            className="border-white border p-1 text-white rounded bg-transparent focus-visible:border-blue-500 focus-visible:ring-1 focus:ring-blue-500" />
                        </div>
                        <div>
                          <Label className="text-white mb-1">説明</Label>
                          <Textarea
                            value={abilityDesc}
                            onChange={(e) => setAbilityDesc(e.target.value)}
                            placeholder="説明を入力"
                            className="text-white focus-visible:border-blue-500 focus-visible:ring-1 focus:ring-blue-500 " />
                        </div>
                      </div>
                    </CardHeader>

                    <CardFooter className="mt-2 flex justify-end bg-transparent pt-2">
                      <Button
                        variant="outline"
                        className="ml-2 bg-gray-200 hover:bg-gray-400"
                        onClick={() => {
                          setIsAbilityAdding(false);
                          setAbilityName("");
                          setAbilityDesc("");
                        }}>
                        キャンセル
                      </Button>
                      <Button
                        variant="outline"
                        className="ml-2 bg-green-200 hover:bg-green-400 text-black"
                        onClick={handleCreateAbility}
                      >
                        追加する
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>

          </Tabs>
        )}
        {editorType === "condition" && selectedAvilityId !== null && (
          <AbilityCondition
            onBack={() => setEditorType("list")}
            abilityId={selectedAvilityId} />
        )}
        {editorType === "effect" && selectedAvilityId !== null && (
          <AbilityEffect
            onBack={() => setEditorType("list")}
            abilityId={selectedAvilityId} />
        )}
      </section>
    </Layout>
  );
}