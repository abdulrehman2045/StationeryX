import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        qty: Number
      }
    ],
    total: { type: Number, required: true },
    address: { type: String, required: [true, 'Address is required'], trim: true },
    phone: { type: String, required: [true, 'Phone is required'], trim: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Order', schema);
