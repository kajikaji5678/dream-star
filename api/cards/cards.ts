import { PrismaClient } from "../../src/generated/prisma/index.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {

    if (req.method === "GET") {
      const cards = await prisma.card.findMany();
      return res.status(200).json(cards);
    }

    if (req.method === "POST") {
      const {name, imageUrl, rarity} = req.body;

      if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
          error: "カード名は必須です",
        });
      }

      const card = await prisma.card.create({
        data: {
          name: name.trim(),
          imageUrl,
          rarity,
        },
      });

      return res.status(201).json(card);
    }

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Database error",
      detail: String(error),
    });
  }
}