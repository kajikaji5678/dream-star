import { prisma } from "../prisma.js";

type ConditionDate = {
  activationTiming?: string;
  target?: string;
  valueNumber?: number | null;
}

type EffectData = {
  effectType?: string;
  specialStatus: string;
  target?: string;
  valueNumber?: null | number;
}

type AbilityData = {
  name: string;
  desc?: string;
}

export async function createCardAbility(cardId: number, data: AbilityData) {
  return prisma.cardAbility.create({
    data: {
      cardId,
      name: data.name,
      description: data.desc
    }
  })
}

export async function getAbilityCondition(abilityId: number) {
  return prisma.abilityCondition.findFirst({
    where: {
      abilityId
    }
  });
}

export async function createAbilityCondition(
  abilityId: number,
  data: ConditionDate
) {
  return prisma.abilityCondition.create({
    data: {
      abilityId,
      activationTiming: data.activationTiming,
      target: data.target,
      valueNumber: data.valueNumber,
    }
  });
}

export async function updateAbilityCondition(
  conditionId: number,
  data: ConditionDate
) {
  return prisma.abilityCondition.update({
    where: {
      id: conditionId
    },
    data: {
      activationTiming: data.activationTiming,
      target: data.target,
      valueNumber: data.valueNumber,
    }
  });
}

export async function deleteAbilityCondition(conditionId: number) {
  return prisma.abilityCondition.delete({
    where: {
      id: conditionId
    }
  })
}

export async function getAbilityEffects(abilityId: number) {
  return prisma.abilityEffect.findMany({
    where: {
      abilityId,
    },
  });
}

export async function createAbilityEffect(
  abilityId: number,
  data: EffectData
) {
  return prisma.abilityEffect.create({
    data: {
      abilityId,
      effectType: data.effectType,
      specialStatus: data.specialStatus,
      target: data.target,
      valueNumber: data.valueNumber,
    },
  });
}

export async function updateAbilityEffect(
  effectId: number,
  data: EffectData
) {
  return prisma.abilityEffect.update({
    where: {
      id: effectId,
    },
    data: {
      effectType: data.effectType,
      specialStatus: data.specialStatus,
      target: data.target,
      valueNumber: data.valueNumber,
    },
  });
}

export async function deleteAbilityEffect(effectId: number) {
  return prisma.abilityEffect.delete({
    where: {
      id: effectId,
    },
  });
}

export async function deleteCardAbility(abilityId: number) {
  return await prisma.cardAbility.delete({
    where: {
      id: abilityId
    }
  })
}

export async function updateCardAbility(abilityId: number, name:string, desc: string) {
  return await prisma.cardAbility.update({
    where: {
      id: abilityId
    },
    data: {
      name,
      desc
    }
  })
}