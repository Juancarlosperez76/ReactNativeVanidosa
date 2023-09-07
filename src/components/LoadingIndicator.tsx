import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import React from 'react';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps) => {
  return (
    <Modal
      visible={isLoading}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.preloadContainer}>
        <ActivityIndicator size="large" color="#5B009D" />
      </View>
    </Modal>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  preloadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
