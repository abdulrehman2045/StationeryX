import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Category name is required'], unique: true, trim: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Category', schema);
