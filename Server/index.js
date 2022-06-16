const Express = require('express');
const nodeCron = require('node-cron');
const app = new Express();
const cors = require('cors');
const router = require('./router/router');
const pushNotificationAndUpdateWaterInterval = require('./utilities/checkIntervals');
//where are the tests?
const PORT = 3111;

app.use(cors()).use(Express.json());

// nodeCron.schedule('* * * *', () => {
//   pushNotificationAndUpdateWaterInterval();
// });

app.use(router).listen(PORT, () => {
  // pushNotificationAndUpdateWaterInterval();
  console.log(`Running express server at ${PORT} 🚀🚀 `);
});
