import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
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
    <View style={{ paddingTop: 10, marginTop: 30 }}>
      <Text style={styles.text}> {plant.nickName}:</Text>
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
        <Text style={styles.text}>
          {waterInterval ? waterInterval : plant.wateringReminderInterval}
        </Text>
      </View>
    </View>
  );
};

export default IntervalSliders;

const styles = StyleSheet.create({
  slidersContainer: { justifyContent: 'center', alignItems: 'center' },
  text: {
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 1.2,
  },
});
