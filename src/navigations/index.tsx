import React from 'react';
import {PixelRatio, Platform, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './bottom-tab';
import Register from '../screen/Auth/Register';
import Login from '../screen/Auth/Login';




const {width} = Dimensions.get('window');

const extraHeaderConfig =
  PixelRatio.get() <= 2 && Platform.OS === 'ios' ? {minWidth: 800} : {};

const headerStyle = {
  backgroundColor: '#000',
  borderWidth: 0,
  borderBottomColor: 'transparent',
  shadowColor: 'transparent',
  elevation: 0,
  shadowRadius: 0,
  shadowOffset: {
    height: 0,
  },
};

const headerTitleStyle = {
  alignSelf: 'center',
  width: width * 0.86,
  textAlign: 'center',
  fontSize: 19,
  ...extraHeaderConfig,
};

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabScreen"
      presentation="card"
      screenOptions={{
        gesturesEnabled: true,
        headerTintColor: '#000',
        headerBackTitle: '',
        headerStyle,
        headerTitleStyle,
        headerShown: false,
      }}>
      <Stack.Screen name="HomeTabScreen" component={BottomTabNavigator} />
      <Stack.Screen name="LoginScreen" component={Login
      } />
      <Stack.Screen name="RegisterScreen" component={Register} />
 
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="ParentSettingsScreen"
      presentation="card"
      screenOptions={{
        gesturesEnabled: true,
        headerTintColor: '#000',
        headerBackTitle: '',
        headerStyle,
        headerTitleStyle,
        headerShown: false,
      }}>
   
    </Stack.Navigator>
  );
}
