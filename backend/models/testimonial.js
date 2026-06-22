import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    avatarImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('testimonial', testimonialSchema);