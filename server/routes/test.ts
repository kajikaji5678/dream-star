import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("test route hit");

  res.json({
    message: "test ok",
  });
});

export default router;