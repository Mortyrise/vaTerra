"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expo_server_sdk_1 = require("expo-server-sdk");
const sendPushNotification = async (targetExpoPushToken, message) => {
    const expo = new expo_server_sdk_1.Expo();
    const chunks = expo.chunkPushNotifications([
        {
            to: targetExpoPushToken,
            sound: 'default',
            body: message,
            title: 'Fiendly reminder from vaTerra',
        },
    ]);
    const sendChunks = async () => {
        // This code runs synchronously. We're waiting for each chunk to be send.
        chunks.forEach(async (chunk) => {
            try {
                const tickets = await expo.sendPushNotificationsAsync(chunk);
                // console.log('Tickets', tickets);
            }
            catch (error) { }
        });
    };
    await sendChunks();
    return true;
};
exports.default = sendPushNotification;
