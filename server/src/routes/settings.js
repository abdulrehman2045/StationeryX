import { Router } from 'express';
import Setting from '../models/Setting.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

const getSetting = async () => (await Setting.findOne()) || (await Setting.create({}));

router.get('/', async (req, res) => res.json(await getSetting()));

router.put('/', protect, adminOnly, async (req, res) => {
  const setting = await getSetting();
  setting.set(req.body);
  res.json(await setting.save());
});

export default router;
