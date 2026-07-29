import { Router } from "express";
import * as discordController from "../controller/discordController.ts"

const router = Router();

router.get("/discord", discordController.redirect);
router.get("/discord/callback", discordController.callback);

export default router;