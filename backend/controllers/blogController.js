import USABlog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import nodemailer from "nodemailer";

// slug helper
const createSlug = title =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// CREATE

// console.log("FILE:", req.file);
// console.log("BODY:", req.body);

export const createBlog = async (req, res) => {
  try {
    const { title, category, content, tags, author, status, image } = req.body;

    console.log("BODY:", req.body);

    if (!title || !category  ) {
      return res.status(400).json({ message: "Title, category and content are required" });
    }

    const slug = createSlug(title);

    const exists = await USABlog.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Blog title already exists" });
    }
    else if(!exists){
      
    }

    let imageUrl = "";
    let imagePublicId = "";

    console.log("IMAGE:", image);

    if (image && image.startsWith("data:image")) {
      const upload = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });

      imageUrl = upload.secure_url;
      imagePublicId = upload.public_id;
    }

    const blog = await USABlog.create({
      title,
      slug,
      category,
      content,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      author,
      status,
      image: imageUrl,
      imagePublicId,
    });

    res.status(201).json(blog);

  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);
    res.status(500).json({ message: "Create failed" });
  }
};


// GET ALL
export const getBlogs = async (req, res) => {
  const blogs = await USABlog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

// GET BY SLUG
export const getBlogBySlug = async (req, res) => {
  const blog = await USABlog.findOne({ slug: req.params.slug });
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

// UPDATE
export const updateBlog = async (req, res) => {
  try {
    const blog = await USABlog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    const { title, category, content, tags, status, author, image } = req.body;

    if (title) {
      blog.title = title;
      blog.slug = createSlug(title);
    }

    if (image) {
      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }
      const upload = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });
      blog.image = upload.secure_url;
      blog.imagePublicId = upload.public_id;
    }

    blog.category = category;
    blog.content = content;
    blog.status = status;
    blog.tags = tags?.split(",").map(t => t.trim());
    blog.author = author;

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE
export const deleteBlog = async (req, res) => {
  const blog = await USABlog.findById(req.params.id);
  if (!blog) return res.status(404).json(false);

  if (blog.imagePublicId) {
    await cloudinary.uploader.destroy(blog.imagePublicId);
  }

  await blog.deleteOne();
  res.json(true);
};

// Increase blog views using slug
export const countClicks = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await USABlog.findOneAndUpdate(
      { slug: slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      views: blog.views
    });

  } catch (error) {
    console.error("Error updating views:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


export const enquiry = async (req, res) => {
  try {
      const { name, email, phone, message } = req.body;
  
      if (!name || !email || !phone  || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }
  
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS
        }
      });
  
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: process.env.EMAIL,
        subject: "New Enqiry",
        html: `
          <h2>New Contact Form Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
  
      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!"
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
};

