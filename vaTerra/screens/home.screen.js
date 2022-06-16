import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import Hibernacle from '../components/Hibernacle';
import { StyleSheet } from 'react-native';

function Home() {
  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  };
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refresh} />}>
        <Hibernacle />
      </ScrollView>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
