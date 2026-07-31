export type CardFormData = {
  imageUrl: string;
  name: string;
  rarity: string
}

export type CardInfo = {
  label: string;
  key: keyof CardFormData;
}