import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  countClicks,
  enquiry,
} from "../controllers/blogController.js";

import upload from "../middleware/upload.js"; // ✅ added

const router = express.Router();

// CREATE (with image)
router.post("/create", upload.single("image"), createBlog);

// READ
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// UPDATE (with image optional)
router.put("/:id", upload.single("image"), updateBlog);

// DELETE
router.delete("/:id", deleteBlog);

// VIEWS
router.put("/views/:slug", countClicks);

// ENQUIRY
router.post("/enquiry", enquiry);

export default router;
