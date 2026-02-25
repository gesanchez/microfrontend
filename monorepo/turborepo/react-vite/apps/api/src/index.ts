import express from 'express';
import cors from 'cors';

// Import module routers
import configRouter from './modules/config/router.js';
import dashboardRouter from './modules/dashboard/router.js';
import profileRouter from './modules/profile/router.js';
import accountRouter from './modules/account/router.js';

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

// Mount modular routers
app.use('/api/config', configRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/profile', profileRouter);
app.use('/api/account', accountRouter);

app.listen(port, () => {
  console.log(`Modular API Service listening at http://localhost:${port}`);
});
