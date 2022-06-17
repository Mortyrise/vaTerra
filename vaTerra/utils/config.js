import firebase from 'firebase';
import * as Notifications from 'expo-notifications';

const firebaseConfig = {
  apiKey: 'AIzaSyBFqo_qOWZbp77GDqf2Fo9nzTkHCuVTQCs',
  authDomain: 'vaterra-legacy.firebaseapp.com',
  projectId: 'vaterra-legacy',
  storageBucket: 'vaterra-legacy.appspot.com',
  messagingSenderId: '70447457043',
  appId: '1:70447457043:web:1ab96a01c2b845e6fab0e6',
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
  // console.log('Token in config file:', { token });
  return token;
};

export { firebase, registerForPushNotificationsAsync };
