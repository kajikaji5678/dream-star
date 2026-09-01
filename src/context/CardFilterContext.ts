import { createContext } from "react";

type CardFilterContextType = {
  sort: string;
  setSort: (value: string) => void;
  rarity: string;
  setRarity: (value: string) => void;
}

export const CardFilterContext = createContext<CardFilterContextType | undefined>(undefined);


