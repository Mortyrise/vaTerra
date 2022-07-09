import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#009c97" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
