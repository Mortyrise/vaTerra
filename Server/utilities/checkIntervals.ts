import { Plant, User } from '../model/model';
import sendPushNotification from './pushNotifications';
import { Expo } from 'expo-server-sdk';
import fetch from 'node-fetch';

const pushNotificationAndUpdateWaterInterval = async () => {
  try {
    const now = Date.now();

    //TODO change this to get user
    // let users = await (await fetch('http://localhost:3111/users')).json();
    const users = await User.find();

    for (const user of users) {
      const expoPushToken = 'ExponentPushToken[HXSGTvOdn0qKrT3EDIlv88]';

      for (const plant of user.plants) {
        if (plant.nextReminderDate > new Date()) {
          if (Expo.isExpoPushToken(expoPushToken)) {
            sendPushNotification(
              expoPushToken,
              `Your ${plant.nickName} has beend added, your interval has been set to each ${plant.wateringReminderInterval} days)`
            );

            // await fetch('http://localhost:3111/user/plant/reminder', {
            //   method: 'PUT',
            //   headers: {
            //     'content-type': 'application/json',
            //   },
            //   body: JSON.stringify({ user: user, plant: plant }),
            // });
          }
          //add the interval again to the old one
        } else {
          console.log(
            `User:${user.userId} Plant: ${
              plant.nickName ? plant.nickName : plant.id
            } has no reminders yet`
          );
        }
      }
    }
  } catch (error) {
    console.log('checkInterval Error:', error);

    // find user plants, find plant and then update nextreminder
  }
};

export default pushNotificationAndUpdateWaterInterval;
