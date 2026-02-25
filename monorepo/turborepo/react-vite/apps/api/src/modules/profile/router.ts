import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    id: 'user_123',
    name: 'German Sanchez',
    email: 'germansanchez@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=German',
    role: 'Administrator',
  });
});

export default router;
