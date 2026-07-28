import "dotenv/config"
import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards.js"
import uploadRouter from "./routes/upload.js"
import path from "path";
import discordRouter from "./routes/discord.js";

const app = express();

console.log("デバック");

console.log("CLIENT_ID:", process.env.DISCORD_CLIENT_ID);
console.log("REDIRECT_URI:", process.env.DISCORD_REDIRECT_URI);

app.use(cors());
app.use(express.json());
app.use("/api/cards", cardsRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/auth", discordRouter);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);



app.listen(3001, () => {
  console.log("API server running on port 3001");
})