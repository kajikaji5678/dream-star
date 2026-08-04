import { Router } from "express";
import { getCards, getCard, createCard, updateCard, deleteCard } from "../controller/cardController.ts";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.get("/:id", getCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;