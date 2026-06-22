import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    content: { type: String },
    tags: [String],
    author: { type: String, default: "Admin" },
    status: { type: String, default: "Published" },
    image: String,
    imagePublicId: String,
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
