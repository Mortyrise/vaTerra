import firebase from 'firebase';
import * as Notifications from 'expo-notifications';

const firebaseConfig = {
  apiKey: 'AIzaSyAwm4JhUIKnJeO4qOjXJbzRKFiLEXH1d58',
  authDomain: 'vaterra-22740.firebaseapp.com',
  projectId: 'vaterra-22740',
  storageBucket: 'vaterra-22740.appspot.com',
  messagingSenderId: '901541040609',
  appId: '1:901541040609:web:c46076836268d4da9082a0',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const registerForPushNotificationsAsync = async function () {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log({ token });
  return token;
};

export { firebase, registerForPushNotificationsAsync };
