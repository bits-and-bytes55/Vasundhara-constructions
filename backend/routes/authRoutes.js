import express from "express";
import { adminLogin } from "../controllers/authController.js";
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", adminLogin);

export default router;
