import Express from 'express';
import cron from 'node-cron';
const morgan = require('morgan');

const app = Express();
app.use(morgan('dev'));

import cors from 'cors';

import router from './router/router';
import pushNotificationAndUpdateWaterInterval from './utilities/checkIntervals';

const PORT = 3111;

app.use(cors()).use(Express.json());

cron.schedule('* * * * *', () => {
  // console.log('running a task every minute');
  pushNotificationAndUpdateWaterInterval();
});

app.use(router).listen(PORT, () => {
  pushNotificationAndUpdateWaterInterval();
  console.log(`🚀🚀 Running express server at ${PORT} 🚀🚀 `);
});
