import { consumePoint, drawCard, saveUserCard } from "../service/gachaService.ts";


export const drawGacha = async (req, res) => {
  try {
    const { userId } = req.body;
    await consumePoint(userId, 2);
    const card = await drawCard();
    await saveUserCard(userId, card.id);
    res.json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "500エラー" });
  }
}