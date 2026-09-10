import { useContext } from "react";
import { BgmContext } from "../contexts/BgmContext";

export function useBgm() {
  const context = useContext(BgmContext);

  if (!context) {
    throw new Error("useBgm must be used within BgmProvider");
  }

  return context;
}