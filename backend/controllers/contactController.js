import USAContact from "../models/Contact.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 2️⃣ Send Email Notification (Admin Notification)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS
  }
});


export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 1️⃣ Save Lead in MongoDB
    await USAContact.create({ name, email, phone, service, message });


    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
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

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@") || !email.includes("."))
    return res.status(400).json({ message: "Invalid email address." });

  try {
    await transporter.sendMail({
      from: `"Bits & Bytes Website" <${process.env.SMTP_EMAIL}>`,
      to: process.env.EMAIL,
      subject: `📬 New Newsletter Subscriber — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#0f0f0f;color:#fff;border-radius:16px;overflow:hidden;border:1px solid #222;">
          <div style="background:linear-gradient(135deg,#06b6d4,#7c3aed);padding:28px 32px;">
            <h2 style="margin:0;font-size:20px;color:#fff;">🎉 New Subscriber!</h2>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px;">Someone just joined your newsletter</p>
          </div>
          <div style="padding:28px 32px;">
            <p style="margin:0 0 8px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.08em;">Subscriber Email</p>
            <p style="margin:0 0 24px;font-size:18px;font-weight:600;color:#22d3ee;">${email}</p>

            <p style="margin:0 0 8px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.08em;">Subscribed At</p>
            <p style="margin:0 0 24px;font-size:15px;color:#ccc;">
              ${new Date().toLocaleString("en-IN", { timeZone: "usa", dateStyle: "full", timeStyle: "short" })}
            </p>

            <div style="border-top:1px solid #222;padding-top:20px;margin-top:4px;">
              <p style="margin:0;font-size:12px;color:#555;">Bits and Bytes IT Solution • bitsandbytesitsolution.com</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(201).json({ message: "Subscribed successfully!" });

  } catch (err) {
    console.error("Newsletter error:", err);
    return res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

