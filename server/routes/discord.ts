import { Router } from "express";
import * as discordController from "../controller/discordController.js"

const router = Router();

router.get("/discord", discordController.redirect);
router.get("/discord/callback", discordController.callback);
router.post("/discord/activity", discordController.activityLogin);

export default router;