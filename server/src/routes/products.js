import { Router } from 'express';
import Product from '../models/Product.js';
import crud from '../utils/crud.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
const handlers = crud(Product);

router.get('/', async (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: 'i' };
  res.json(await Product.find(filter).populate('category', 'name').sort('-createdAt'));
});

router.post('/', protect, adminOnly, handlers.create);
router.put('/:id', protect, adminOnly, handlers.update);
router.delete('/:id', protect, adminOnly, handlers.remove);

export default router;
