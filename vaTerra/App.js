import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import HomeScreen from './screens/home.screen';
import AddPlant from './screens/addPlant.screen';

import WaterReminder from './screens/waterRemind.screen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
// import { LogBox } from 'react-native';

const Tab = createMaterialBottomTabNavigator();
// console.disableYellowBox = true;1

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          labeled={false}
          barStyle={{ backgroundColor: '#009c97', height: 60 }}
          activeColor="white"
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              unmountOnBlur: true,
              tabBarIcon: () => {
                return (
                  <MaterialCommunityIcons
                    name="home-variant"
                    size={28}
                    color={'rgb(243,242,238)'}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="addPlant"
            component={AddPlant}
            options={{
              tabBarIcon: () => {
                return (
                  <MaterialCommunityIcons
                    name="plus"
                    size={30}
                    color={'rgb(243,242,238)'}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="waterReminder"
            component={WaterReminder}
            options={{
              tabBarIcon: () => {
                return (
                  <MaterialCommunityIcons
                    name="water"
                    size={28}
                    color={'rgb(243,242,238)'}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    justifyContent: 'space-between',
  },
});
