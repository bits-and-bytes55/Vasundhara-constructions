import Admin from "../models/adminModel.js";

export const createAdmin = async () => {
  const admin = new Admin({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  await admin.save();
};

createAdmin();
