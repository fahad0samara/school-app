import React, { useEffect } from 'react';
import { View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { setLanguage } from '../redux/Language/languageSlice'; // Adjust the path as needed
import { useTranslation } from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screen/Home/HomeScreen';
import Courses from '../screen/courses/Courses';
import Profil from '../screen/Profile/Profil';
import i18n from '../config/translations';

const deviceWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();

  const language = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

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
        lazy: false,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007BFF',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderColor: 'transparent',
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 10,
        },
      }}>
      {TAB_SCREENS.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            tabBarLabel: ({ focused, color, position }) => (
              <TabBarLabel
                focused={focused}
                color={color}
                label={item.label}
                position={position}
              />
            ),
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon focused={focused} icon={item.icon} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      presentation="card"
      screenOptions={{
        gesturesEnabled: true,
        headerTintColor: '#000',
        headerBackTitle: '',
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={Profil} />
    </Stack.Navigator>
  );
}

function TabBarLabel({ focused, color, label, position }) {
  return (
    <Text
      style={{
        fontSize: deviceWidth < 600 ? 10 : 12,
        lineHeight: 15,
        textAlign: 'center',
        color: color || '#D1D1D1',
        zIndex: 100,
        marginLeft: position === 'beside-icon' ? 15 : 0,
      }}>
      {label}
    </Text>
  );
}

function TabBarIcon({ focused, icon, color }) {
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
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },
});
