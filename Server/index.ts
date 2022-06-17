import Express from 'express';

// import nodeCreon from 'node-cron';

const app = Express();

import cors from 'cors';

import router from './router/router';
// const pushNotificationAndUpdateWaterInterval = require('./utilities/checkIntervals');

const PORT = 3111;

app.use(cors()).use(Express.json());

// nodeCron.schedule('* * * *', () => {
//   pushNotificationAndUpdateWaterInterval();
// });

app.use(router).listen(PORT, () => {
  // pushNotificationAndUpdateWaterInterval();
  console.log(`Running express server at ${PORT} 🚀🚀 `);
});
