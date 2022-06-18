const { Expo } = require('expo-server-sdk');

const sendPushNotification = async (targetExpoPushToken, message) => {
  const expo = new Expo();
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
      } catch (error) {}
    });
  };

  await sendChunks();
};

module.exports = sendPushNotification;
