import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ role: "admin_token", email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
