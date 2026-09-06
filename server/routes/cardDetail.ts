import { Router } from "express";

import { getCondition, createCondition, updateCondition, deleteCondition } from "../controller/cardDetailController.js";
import { getEffects, createEffect, updateEffect, deleteEffect } from "../controller/cardDetailController.js";

const router = Router();

router.get("/:abilityId/conditions", getCondition);
router.post("/:abilityId/conditions", createCondition);
router.put("/conditions/:conditionId", updateCondition);
router.delete("/conditions/:conditionId", deleteCondition);
router.get("/:abilityId/effects", getEffects);
router.post("/:abilityId/effects", createEffect);
router.put("/effects/:effectId", updateEffect);
router.delete("/effects/:effectId", deleteEffect);

export default router;