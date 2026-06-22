import express from "express";
import { submitContactForm, subscribe } from "../controllers/contactController.js";


const router = express.Router();

router.post("/submit", submitContactForm);
export default router;
