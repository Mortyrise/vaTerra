import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Platform,
  ImageBackground,
} from 'react-native';
import Hibernacle from '../components/Hibernacle';
import { StyleSheet } from 'react-native';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/backgroundCover.jpeg')}
        resizeMode="cover"
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Hibernacle refreshing={refreshing} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: Platform.OS === 'android' ? 180 : 0,
  },
});
