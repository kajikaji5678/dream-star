import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({storage});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: "400 画像なし"});
    }
    res.json({imageUrl: `/uploads/${req.file.filename}`});
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "500 アップロード失敗"
    })
  }
});

export default router;