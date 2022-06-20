import { Expo } from 'expo-server-sdk';

const sendPushNotification = async (
  targetExpoPushToken: string,
  message: string
) => {
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
  return true;
};

export default sendPushNotification;
