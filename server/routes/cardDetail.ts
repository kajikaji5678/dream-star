import { Router } from "express";

import { getCondition, createCondition, updateCondition, deleteCondition } from "../controller/cardDetailController.js";

const router = Router();

router.get("/:abilityId/conditions", getCondition);
router.post("/:abilityId/conditions", createCondition);
router.put("/conditions/:conditionId", updateCondition);
router.delete("/conditions/:conditionId", deleteCondition);

export default router;