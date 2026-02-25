import { Router } from 'express';

const router = Router();

router.get('/mfes', (req, res) => {
  res.json([
    {
      name: 'dashboard',
      module: './Dashboard',
      url: 'http://localhost:5001/assets/remoteEntry.js',
      template: 'standard',
    },
  ]);
});

export default router;
