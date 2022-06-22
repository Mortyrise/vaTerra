"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model/model");
const pushNotifications_1 = __importDefault(require("./pushNotifications"));
const expo_server_sdk_1 = require("expo-server-sdk");
const pushNotificationAndUpdateWaterInterval = async () => {
    try {
        const now = Date.now();
        //TODO change this to get user
        // let users = await (await fetch('http://localhost:3111/users')).json();
        const users = await model_1.User.find();
        for (const user of users) {
            const expoPushToken = 'ExponentPushToken[HXSGTvOdn0qKrT3EDIlv88]';
            for (const plant of user.plants) {
                if (plant.nextReminderDate > new Date()) {
                    if (expo_server_sdk_1.Expo.isExpoPushToken(expoPushToken)) {
                        (0, pushNotifications_1.default)(expoPushToken, `Your ${plant.nickName} has beend added, your interval has been set to each ${plant.wateringReminderInterval} days)`);
                        // await fetch('http://localhost:3111/user/plant/reminder', {
                        //   method: 'PUT',
                        //   headers: {
                        //     'content-type': 'application/json',
                        //   },
                        //   body: JSON.stringify({ user: user, plant: plant }),
                        // });
                    }
                    //add the interval again to the old one
                }
                else {
                    console.log('you have no reminders yet');
                }
            }
        }
    }
    catch (error) {
        console.log('checkInterval Error:', error);
        // find user plants, find plant and then update nextreminder
    }
};
exports.default = pushNotificationAndUpdateWaterInterval;
