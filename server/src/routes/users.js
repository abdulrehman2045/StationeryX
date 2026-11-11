import { Router } from 'express';
import User from '../models/User.js';
import crud from '../utils/crud.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
const handlers = crud(User);

router.use(protect, adminOnly);

router.get('/', handlers.list);
router.post('/', handlers.create);
router.put('/:id', handlers.update);

router.delete('/:id', async (req, res) => {
  if (req.params.id === req.user.id) return res.status(400).json({ message: 'You cannot delete your own account' });
  await handlers.remove(req, res);
});

export default router;
