import { Router } from "express";
import { CollectionRanking } from "../controller/rankingController.js";

const router = Router();

router.get("/", CollectionRanking);

export default router;