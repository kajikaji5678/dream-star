import type { Request, Response } from "express";
import { getAbilityCondition, createAbilityCondition, updateAbilityCondition, deleteAbilityCondition, createCardAbility } from "../service/cardDetailService.js";

import {
  getAbilityEffects,
  createAbilityEffect,
  updateAbilityEffect,
  deleteAbilityEffect,
} from "../service/cardDetailService.ts";

export async function createAbility(req: Request, res: Response) {
  try {
    const cardId = Number(req.params.cardId);
    const { name, desc } = req.body;
    const ability = await createCardAbility(cardId, {
      name,
      desc
    });
    return res.status(201).json(ability);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `${e}` });
  }
}

export async function getCondition(req: Request, res: Response) {
  try {
    const abilityId = Number(req.params.abilityId);
    const condition = await getAbilityCondition(abilityId);
    return res.status(200).json(condition ?? []);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `${e}` });
  }
}

export async function createCondition(req: Request, res: Response) {
  try {
    const abilityId = Number(req.params.abilityId);
    const { activationTiming, target, valueNumber } = req.body;
    const condition = await createAbilityCondition(
      abilityId,
      {
        activationTiming,
        target,
        valueNumber
      }
    );
    return res.status(201).json(condition);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `${e}` });
  }
}

export async function updateCondition(req: Request, res: Response) {
  try {
    const conditionId = Number(req.params.conditionId);
    const { activationTiming, target, valueNumber } = req.body;
    const condition = await updateAbilityCondition(
      conditionId,
      {
        activationTiming,
        target,
        valueNumber
      }
    );
    return res.status(200).json(condition);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `${e}` });
  }
}

export async function deleteCondition(req: Request, res: Response) {
  try {
    const conditionIdId = Number(req.params.conditionId);
    await deleteAbilityCondition(conditionIdId);
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `${e}` });
  }
}

export async function getEffects(
  req: Request,
  res: Response
) {
  try {
    const abilityId = Number(req.params.abilityId);

    const effects = await getAbilityEffects(abilityId);

    return res.status(200).json(effects);
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: `${e}` });
  }
}

export async function createEffect(
  req: Request,
  res: Response
) {
  try {
    const abilityId = Number(req.params.abilityId);

    const {
      effectType,
      specialStatus,
      target,
      valueNumber,
    } = req.body;

    const effect = await createAbilityEffect(
      abilityId,
      {
        effectType,
        specialStatus,
        target,
        valueNumber,
      }
    );

    return res.status(201).json(effect);
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: `${e}` });
  }
}

export async function updateEffect(
  req: Request,
  res: Response
) {
  try {
    const effectId = Number(req.params.effectId);

    const {
      effectType,
      specialStatus,
      target,
      valueNumber,
    } = req.body;

    const effect = await updateAbilityEffect(
      effectId,
      {
        effectType,
        specialStatus,
        target,
        valueNumber,
      }
    );

    return res.status(200).json(effect);
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: `${e}` });
  }
}

export async function deleteEffect(
  req: Request,
  res: Response
) {
  try {
    const effectId = Number(req.params.effectId);

    await deleteAbilityEffect(effectId);

    return res.status(204).send();
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: `${e}` });
  }
}