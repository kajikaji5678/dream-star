import { useContext, createContext } from "react";

type BgmContextType = {
  volume: number;
  setVolume: (value: number) => void;
}

const BgmContext = createContext<BgmContextType | undefined>(undefined);

export function useBgm() {
  const context = useContext(BgmContext);
  if (!context) throw new Error("error");
  return context
}