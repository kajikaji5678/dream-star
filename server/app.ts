import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import cardsRouter from "./routes/cards.js";
import discordRouter from "./routes/discord.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cards", cardsRouter);
app.use("/api/auth", discordRouter);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

export default app;