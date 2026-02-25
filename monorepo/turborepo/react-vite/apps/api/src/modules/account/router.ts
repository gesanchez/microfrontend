import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    balance: 15750.50,
    currency: 'USD',
    lastMovements: [
      { id: 'm1', description: 'Amazon Purchase', amount: -120.50, date: '2024-03-20' },
      { id: 'm2', description: 'Salary Deposit', amount: 3500.00, date: '2024-03-15' },
      { id: 'm3', description: 'Monthly Rent', amount: -1000.00, date: '2024-03-01' },
      { id: 'm4', description: 'Starbucks Coffee', amount: -5.75, date: '2024-02-28' },
    ],
  });
});

export default router;
