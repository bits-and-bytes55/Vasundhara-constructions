import express from 'express';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';  
import { protect } from '../middleware/authMiddleware.js';
import upload from "../middleware/upload.js";


const router = express.Router();

router.route('/').get(getTestimonials);
router.route('/:id').get(getTestimonialById);

router.route('/').post(protect, upload.single("avatarImage"), createTestimonial);
router.route('/:id').put(protect, upload.single("avatarImage"), updateTestimonial).delete(protect, deleteTestimonial);

export default router;