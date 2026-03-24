import { Router } from 'express';

const router = Router();

router.get('/mfes', (req, res) => {
  res.json([
    {
      name: 'dashboard',
      module: './Dashboard',
      url: 'http://localhost:5001/assets/remoteEntry.js',
      template: 'main',
      route: '/dashboard',
      icon: 'LayoutDashboard',
      label: 'Dashboard',
    },
    {
      name: 'account',
      module: './Account',
      url: 'http://localhost:5002/assets/remoteEntry.js',
      template: 'main',
      route: '/dashboard/account',
      icon: 'UserCircle',
      label: 'Manage Account',
    },
  ]);
});

export default router;
