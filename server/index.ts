import app from "./app.js";
import { registerGachaCompleteListener } from "./events/gacha/gachaCompletedListener.ts";

registerGachaCompleteListener();

app.listen(3001, () => {
  console.log("API server running on port 3001");
});
