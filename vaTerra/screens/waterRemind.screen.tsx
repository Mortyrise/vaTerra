import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import IntervalSliders from '../components/IntervalSliders';
import { getUser } from '../utils/service';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function WaterRemind() {
  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    try {
      const data = await getUser(1);
      if (data.plants) {
        setPlants(data.plants);
      }
    } catch (error) {
      console.log('Error waterRemid', error);
    }
  };

  useEffect(() => {
    getData();
  }, [refreshing]);
  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.slidersContainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>Watering Reminders</Text>
          </View>
          <View style={{ marginTop: 40 }}>
            {plants.map((plant, index, user) => (
              <View key={index}>
                <Text style={styles.text}> {plant.latin}</Text>
                <IntervalSliders plant={plant} user={user} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  slidersContainer: {
    marginTop: 40,
    flex: 1,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    color: '#009c97',
    letterSpacing: 3,
  },
});
export default WaterRemind;
