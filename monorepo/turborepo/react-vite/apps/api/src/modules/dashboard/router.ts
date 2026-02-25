import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    revenue: [
      { month: 'Jan', value: 4000 },
      { month: 'Feb', value: 3000 },
      { month: 'Mar', value: 2000 },
      { month: 'Apr', value: 2780 },
      { month: 'May', value: 1890 },
      { month: 'Jun', value: 2390 },
    ],
    users: 1250,
    activeSessions: 45,
  });
});

export default router;
