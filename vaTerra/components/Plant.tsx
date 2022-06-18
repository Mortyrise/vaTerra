import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const Plant = ({ plant }) => {
  // console.log('Plant()');

  return (
    <View style={styles.plantContainer}>
      <Image
        source={{ uri: plant.imagePath }}
        style={styles.plantImage}
      ></Image>
      <Text style={styles.plantText}>{plant.nickName}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  plantImage: {
    width: 150,
    height: 200,
    borderRadius: 90,
  },
  plantContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  plantText: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontSize: 16,
    letterSpacing: 1.5,
  },
});

export default Plant;