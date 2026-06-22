import express from "express";
import { uploadImage, deleteImage } from "../controllers/uploadController.js";
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/upload", uploadImage);
router.post("/delete", deleteImage);

export default router;
