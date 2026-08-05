import { Router } from "express";
import { getCards, getCard, createCard, updateCard, deleteCard, getUserCards } from "../controller/cardController.js";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.get("/:id", getCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);
router.get("/user/:id", getUserCards);

export default router;