import { Router } from 'express';
import Message from '../models/Message.js';
import crud from '../utils/crud.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
const handlers = crud(Message);

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  await Message.create({ name, email, message });
  res.status(201).json({ message: 'Message sent' });
});

router.get('/', protect, adminOnly, handlers.list);
router.delete('/:id', protect, adminOnly, handlers.remove);

export default router;
