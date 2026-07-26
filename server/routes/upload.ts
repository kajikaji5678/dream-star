import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/cards");
  },

  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `${Date.now()}${ext}`
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        error: "画像がありません"
      });
    }

    res.json({
      imageUrl: `/uploads/cards/${req.file.filename}`,
    });
  }
);

export default router;