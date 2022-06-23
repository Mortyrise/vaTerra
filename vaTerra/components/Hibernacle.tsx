import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import React, { useEffect } from 'react';
import Plant from './Plant';
import { useState } from 'react';
import { getPlants, getUser } from '../utils/service';

const Hibernacle = ({ refreshing }) => {
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState(null);

  const getData = async () => {
    try {
      const data = await getUser(1);
      // console.log('GetUserData', data);
      setUser(data);
      // console.log('UserSet:', user);
      setPlants(data.plants);
    } catch (error) {
      console.log('Error get Data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.hibernacleContainer}>
        <View>
          <Text style={styles.text}>HIBERNACLE</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Hello {user ? user.userName : 'Guest'}!
          </Text>
        </View>
        <View style={styles.hibernacleWrapper}>
          {plants.map((element, index) => (
            <Plant plant={element} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Hibernacle;

const styles = StyleSheet.create({
  text: {
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    color: '#009c97',
    letterSpacing: 3,
  },
  hibernacleContainer: {
    flex: 1,
    width: 395,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 60 : 0,
  },
  hibernacleWrapper: {
    flex: 1,
    width: 360,
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',

    marginTop: 20,
    borderRadius: 20,
  },
});
