import { PrismaClient } from "@prisma/client";
import type {VercelRequest, VercelResponse} from "@vercel/node";

const prisma = new PrismaClient();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not Allowd"
    });
  }

  const cards = await prisma.card.findMany();

  return res.status(200).json(cards);
}