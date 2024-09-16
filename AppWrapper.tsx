// src/components/LoadingOverlay.js
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingOverlay = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="#007BFF" />
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000, // Ensure it's above other elements
  },
});

export default LoadingOverlay;
