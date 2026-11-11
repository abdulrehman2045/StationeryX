import { Router } from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.post('/', async (req, res) => {
  const { items, address, phone } = req.body;
  if (!items?.length) return res.status(400).json({ message: 'Your cart is empty' });

  const products = await Product.find({ _id: { $in: items.map((item) => item.product) } });
  const lines = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.product);
    const qty = Number(item.qty);
    if (!product || qty < 1 || product.stock < qty) {
      return res.status(400).json({ message: `${product?.name || 'A product'} is not available in the requested quantity` });
    }
    lines.push({ product: product._id, name: product.name, price: product.price, qty });
  }

  await Promise.all(lines.map((line) => Product.updateOne({ _id: line.product }, { $inc: { stock: -line.qty } })));
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  res.status(201).json(await Order.create({ user: req.user._id, items: lines, total, address, phone }));
});

router.get('/mine', async (req, res) => {
  res.json(await Order.find({ user: req.user._id }).sort('-createdAt'));
});

router.get('/', adminOnly, async (req, res) => {
  res.json(await Order.find().populate('user', 'name email').sort('-createdAt'));
});

router.put('/:id', adminOnly, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

export default router;
