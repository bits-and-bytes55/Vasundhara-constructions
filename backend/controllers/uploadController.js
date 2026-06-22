import cloudinary from "../config/cloudinary.js";

// 🔹 Upload Image
export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body; // base64 string

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "bitsandbytes",
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// 🔹 Delete Image
export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ message: "public_id is required" });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    res.status(200).json({
      message: "Image deleted successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
