import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true },
    message: { type: String, required: [true, 'Message is required'], trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Message', schema);
