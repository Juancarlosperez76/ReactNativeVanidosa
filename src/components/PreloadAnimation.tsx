import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const PreloadAnimation = () => {

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
};

export default PreloadAnimation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});