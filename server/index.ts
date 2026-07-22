import  express  from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/discord", (req, res) => {
  console.log(req.body);
  res.json({
    message: "received"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});