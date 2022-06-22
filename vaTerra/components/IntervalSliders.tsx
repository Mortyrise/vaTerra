import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, Image } from 'react-native';
import { updateReminder } from '../utils/service';

const IntervalSliders = ({ plant, user }) => {
  const [waterInterval, setWaterInterval] = useState(null);

  // const handleValueChange = async function () {
  //   updateReminder(
  //     { _id: '62a21daf09bc8c794d8b02b3', id: '8' },
  //     plant,
  //     waterInterval
  //   );
  // };
  const handleValueChange = async function () {
    updateReminder(user, plant, waterInterval);
  };

  return (
    <View style={styles.container}>
      <View style={styles.plantCont}>
        <Text style={styles.nickName}> {plant.nickName}</Text>
        <Image
          source={{ uri: plant.imagePath }}
          style={styles.plantImage}
        ></Image>
      </View>
      <Text>Watering Schedule</Text>
      <View style={styles.slidersContainer}>
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={1}
          maximumValue={15}
          minimumTrackTintColor={'#009c97'}
          onValueChange={(value) => {
            setWaterInterval(Math.floor(value));
            handleValueChange();
          }}
          thumbTintColor={'#009c97'}
          value={plant.wateringReminderInterval}
        />
        <Text>
          {waterInterval
            ? waterInterval
            : ` Water once every ${plant.wateringReminderInterval} days`}
        </Text>
      </View>
    </View>
  );
};

export default IntervalSliders;

const styles = StyleSheet.create({
  slidersContainer: { justifyContent: 'center', alignItems: 'center' },
  container: {
    margin: 10,
    borderColor: '#009c97',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
  },
  nickName: {
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 1.2,
    marginTop: 40,
  },
  plantCont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  plantImage: {
    width: 130,
    height: 130,
    borderRadius: 20,
  },
});
