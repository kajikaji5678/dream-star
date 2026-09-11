import { createContext } from "react";

export type BgmContextType = {
  volume: number;
  setVolume: (value: number) => void;
};

export const BgmContext = createContext<BgmContextType | undefined>(undefined);