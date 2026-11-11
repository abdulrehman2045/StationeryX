import { Router } from 'express';
import Category from '../models/Category.js';
import crud from '../utils/crud.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
const handlers = crud(Category);

router.get('/', handlers.list);
router.post('/', protect, adminOnly, handlers.create);
router.put('/:id', protect, adminOnly, handlers.update);
router.delete('/:id', protect, adminOnly, handlers.remove);

export default router;
