const Plant = require('../model/model');
const User = require('../model/model');
const sendPushNotification = require('./pushNotifications');
const { Expo } = require('expo-server-sdk');
const controller = require('../controller/controller');

const pushNotificationAndUpdateWaterInterval = async () => {
  try {
    const now = Date.now();

    console.log(User);
    let users = await (await fetch('http://localhost:3111/users')).json();

    for (let i = 0; i < users.length; i++) {
      const expoPushToken = 'ExponentPushToken[HXSGTvOdn0qKrT3EDIlvXN]';

      for (let key of users[0].plantsArray) {
        if (Date(key.nextReminderDate) < Date(now)) {
          if (Expo.isExpoPushToken(expoPushToken)) {
            await sendPushNotification(
              expoPushToken,
              `Your ${key.nickName} has beend added, your interval has been set to each ${key.wateringReminderinterval} days)`
            );
            await fetch('http://localhost:3111/user/plant/reminder', {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({ user: users[i], plant: key }),
            });
          }
          //add the interval again to the old one
        } else {
          console.log('you have no reminders yet');
        }
      }
    }
  } catch (error) {
    console.log(error);

    // find user plants, find plant and then update nextreminder
  }
};

module.exports = pushNotificationAndUpdateWaterInterval;
