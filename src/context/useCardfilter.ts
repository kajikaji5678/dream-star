import { useContext } from "react";
import { CardFilterContext } from "./CardFilterContext";

export function useCardFilter() {
  const context = useContext(CardFilterContext);
  if (!context) throw new Error ("context error");
  return context;
}