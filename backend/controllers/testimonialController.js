import ustestimonial from '../models/testimonial.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await ustestimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await ustestimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, quote, rating, avatarImage } = req.body;

    if (!name || !role || !quote || !rating) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "testimonials" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    // ✅ CASE 2: Base64 image
    else if (avatarImage && avatarImage.startsWith("data:image")) {
      const upload = await cloudinary.uploader.upload(avatarImage, {
        folder: "testimonials",
      });

      imageUrl = upload.secure_url;
      imagePublicId = upload.public_id;
    }

    const testimonial = new ustestimonial({
      name,
      role,
      quote,
      rating,
      avatarImage: imageUrl,
      avatarPublicId: imagePublicId,
    });

    const saved = await testimonial.save();

    res.status(201).json(saved);

  } catch (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateTestimonial = async (req, res) => {
  try {
    const { name, role, quote, rating, avatarImage } = req.body;

    const testimonial = await ustestimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.name = name ?? testimonial.name;
    testimonial.role = role ?? testimonial.role;
    testimonial.quote = quote ?? testimonial.quote;
    testimonial.rating = rating ?? testimonial.rating;
    testimonial.avatarImage = avatarImage ?? testimonial.avatarImage;

    const updated = await testimonial.save();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await ustestimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};