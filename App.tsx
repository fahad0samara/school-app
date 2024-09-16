// Path: src/screens/root.js
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import AppNavigator from './src/navigations';
import ImmersiveMode from 'react-native-immersive-mode';
import LayoutWrapper from './src/navigations/DirectionLayout';


const { width, height } = Dimensions.get('window');

const App = () => {


  return (
    <LayoutWrapper>

      <AppNavigator />



    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  overlay: {
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
