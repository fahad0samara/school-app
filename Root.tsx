// Path: src/screens/root.js
import React from 'react';
import {ActivityIndicator, Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import AppNavigator from './src/navigations';
import { persistor, store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { navigationRef } from './src/navigations/navigations';
import App from './App';


const {width, height} = Dimensions.get('window');

const Root = () => {


  return (
    <Provider store={store}>
 
        <NavigationContainer ref={navigationRef} >
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            barStyle="dark-content"
          />
          <App />
       
        </NavigationContainer>
   
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
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

export default Root;
