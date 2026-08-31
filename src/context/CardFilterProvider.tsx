import { useState, type ReactNode } from "react";
import { CardFilterContext } from "./CardFilterContext";

type Props = {
  children: ReactNode
};

export function CardFilterProvider({ children }: Props) {
  const [sort, setSort] = useState("owned-desc");
  const [rarity, setRarity] = useState("rarity-desc");

  return (
    <CardFilterContext.Provider
      value={{ sort, setSort, rarity, setRarity }}>
        {children}
    </CardFilterContext.Provider>
  );
}