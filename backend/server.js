import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import testimonialRoutes from './routes/testimonialRoute.js';

const app = express();

// Body parsers (important for FormData)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


const allowedOrigins = [
  "https://vasundharaconstruction.co.in",
  "https://www.vasundharaconstruction.co.in",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173"
];

// ✅ FIXED CORS (no wildcard OPTIONS)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use("/api/blogs", blogRoutes);
app.use("/api/auth/adminlogin", authRoutes);
app.use("/api/image", uploadRoutes);
app.use('/api/testimonials', testimonialRoutes);


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post('/api/contact', async (req, res) => {
  const { fullName, phone, email, city, service, projectScale, message } = req.body;

  if (!fullName || !phone || !email) {
    return res.status(400).json({ error: 'Name, phone and email are required.' });
  }

  try {
    const mailOptions = {
      from: `"Vasundhara Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Request from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>City:</strong> ${city || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
        <p><strong>Project Scale:</strong> ${projectScale || 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${message || 'No message'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
