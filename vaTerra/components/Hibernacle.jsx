import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Plant from './Plant';
import { useState } from 'react';
import { getPlants, getUser } from '../utils/service';

const Hibernacle = (props) => {
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState(null);

  const getData = async () => {
    try {
      const data = await getUser(1);
      console.log('GetUserData', data);
      setUser(data);
      console.log('UserSet:', user);
      // setPlants(data.plantsArray);
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
          <Text style={styles.text}>{user ? user.userEmail : ''}</Text>
        </View>

        <View style={styles.hibernacleWrapper}>
          {/* {plants.map((element, index) => (
            <Plant plant={element} key={index} />
          ))} */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Hibernacle;

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#009c97',
    letterSpacing: 8,
  },
  hibernacleContainer: {
    marginTop: 45,
    flex: 1,
    width: 395,
    justifyContent: 'center',
    alignItems: 'center',
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
