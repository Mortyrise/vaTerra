import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import React from 'react';

const Plant = ({ plant }) => {
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
    borderRadius: 20,
    borderColor: '#009c97',
    borderWidth: 3,
  },
  plantContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  plantText: {
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    fontSize: 16,
    letterSpacing: 1.5,
    fontWeight: '500',
  },
});

export default Plant;
