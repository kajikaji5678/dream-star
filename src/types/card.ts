export type CardFormData = {
  imageUrl: string;
  name: string;
  rarity: string
}

export type Card = {
  id: number;
  imageUrl: string;
  name: string;
  rarity: string;
}

export type CardInfo = {
  label: string;
  key: keyof CardFormData;
}