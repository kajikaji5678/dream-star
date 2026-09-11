export type CardFormData = {
  imageUrl: string;
  name: string;
  rarity: string;
  hp?: number | "";
  // type?: string;
  attack?: number | "";
  // SKILL?: string;
  escapePoint?: number | "";
  category?: string;
  consumePoint?: number | "";
  supportType?: string;
  mainType?: string;
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

export type Condition = {
  id: number;
  abilityId: number;
  activationTiming: string | null;
  target: string | null;
  valueNumber: number | null;
};

export type Ability = {
  id: number;
  name: string;
  description: string | null;
}