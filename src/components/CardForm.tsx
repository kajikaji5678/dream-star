import type { CardInfo, CardFormData } from "../types/card";

type Props = {
  card: CardFormData;
  setCard: React.Dispatch<React.SetStateAction<CardFormData>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  buttonText: string;
  onSubmit: () => void;
};

const cardInfo: CardInfo[] = [
  { label: "画像URL", key: "imageUrl" },
  { label: "名前", key: "name" },
  { label: "レア度", key: "rarity" },
];

export default function CardForm({
  card,
  setCard,
  setImageFile,
  previewUrl,
  setPreviewUrl,
  error,
  buttonText,
  onSubmit,
}: Props) {
  return (
    <div className="mt-4 flex-1 rounded-lg bg-black/20 p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="rounded-lg bg-black/30 p-4">
            <img
              src={previewUrl}
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="col-span-2">
          <table className="w-full text-white">
            <tbody>
              {cardInfo.map((item) => (
                <tr key={item.key} className="border-b border-white/20">
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
                        className="bg-black/30 rounded px-3 py-2 w-full"
                      />
                    ) : (
                      <input
                        value={card[item.key]}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            [item.key]: e.target.value,
                          })
                        }
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
              onClick={onSubmit}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}