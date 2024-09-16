import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, I18nManager, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screen/Home/HomeScreen';
import Courses from '../screen/courses/Courses';
import Profile from '../screen/Profile/Profil';
import i18n from '../config/translations';
import { BackHandler } from 'react-native';
import LayoutWrapper from './DirectionLayout';
import LanguageSwitchButton from '../Hooks/language/LanguageSwitchButton';

const deviceWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarLabel = ({ focused, color, label }) => {
  return (
    <Text
      style={[
        {
          fontSize: deviceWidth < 600 ? 10 : 12,
          lineHeight: 15,
          textAlign: 'center',
          color: color || '#D1D1D1',
        },
        focused && { fontWeight: 'bold' },
      ]}
    >
      {label}
    </Text>
  );
};

const TabBarIcon = ({ focused, icon, color }) => {
  return (
    <View style={styles.iconContainer}>
      <FontAwesome
        name={icon}
        size={25}
        color={color || '#D1D1D1'}
        style={styles.icon}
      />
    </View>
  );
};




const BottomTabNavigator = () => {
  const { t } = useTranslation();
  const TAB_SCREENS = [
    {
      name: 'HomeScreen',
      component: Home,
      label: t('bottomNavigation.home'),
      icon: 'home',
    },
    {
      name: 'Courses',
      component: Courses,
      label: t('bottomNavigation.courses'),
      icon: 'book',
    },
    {
      name: 'ProfileStackScreen',
      component: ProfileStack,
      label: t('bottomNavigation.profile'),
      icon: 'user',
    },
  ];

  return (
   
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          lazy: true,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#007BFF',
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            borderColor: 'transparent',
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 10,
          },
        }}
      >
        {TAB_SCREENS.map((item) => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              tabBarLabel: ({ focused, color }) => (
                <TabBarLabel focused={focused} color={color} label={item.label} />
              ),
              tabBarIcon: ({ focused, color }) => (
                <TabBarIcon focused={focused} icon={item.icon} color={color} />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
  
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerTintColor: '#000',
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="LanguageSwitch" component={LanguageSwitchButton} />

    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },
});

export default BottomTabNavigator;
