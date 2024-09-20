import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { useTranslation } from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';
import { useDarkMode } from '../Hooks/darkmode/useDarkMode';
import { COLORS } from '../constants/theme';

import Courses from '../screen/courses/Courses';
import Profile from '../screen/Profile/Profil';
import LanguageSwitchButton from '../Hooks/language/LanguageSwitchButton';
import Login from '../screen/Auth/Login';
import registerScreen from '../screen/Auth/Register';

import Home from '../screen/Home/HomeScreen';
import MyCourses from '../screen/my-course/MyCourses';

const deviceWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom hook to handle animations
const useTabAnimation = () => {
  const [animation] = React.useState(new Animated.Value(0));

  const animateTab = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  return { animation, animateTab };
};

const TabBarLabel = ({ focused, color, label }) => {
  const { animation, animateTab } = useTabAnimation();

  React.useEffect(() => {
    if (focused) {
      animateTab();
    }
  }, [focused, animateTab]);

  return (
    <Animated.Text
      style={[
        {
          fontSize: deviceWidth < 600 ? 10 : 12,
          lineHeight: 15,
          textAlign: 'center',
          color: color,
          transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) }],
        },
        focused && { fontWeight: 'bold' },
      ]}
    >
      {label}
    </Animated.Text>
  );
};

const TabBarIcon = ({ focused, icon, color }) => {
  return (
    <View style={styles.iconContainer}>
      <FontAwesome
        name={icon}
        size={25}
        color={color}
        style={styles.icon}
      />
    </View>
  );
};

const BottomTabNavigator = () => {
  const { t } = useTranslation();
  const { isDarkMode, colors } = useDarkMode();

  const TAB_SCREENS = [
    {
      name: 'Home',
      component: Home,
      label: t('bottomNavigation.home'),
      icon: 'home',
    },
    {
      name: 'MyCourses',
      component: MyCourses,
      label: t('bottomNavigation.courses'),
      icon: 'book',
    },
    {
      name: 'ProfileStackScreen',
      component: Profile,
      label: t('bottomNavigation.profile'),
      icon: 'user',
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: isDarkMode ? COLORS.dark1 : COLORS.white,

          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          borderColor: colors.border,
          position: 'absolute',
          shadowColor: isDarkMode ? COLORS.grayTie : COLORS.black,

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
      initialRouteName="Login"
      screenOptions={{

        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ProfileScreen" component={Profile} />

    </Stack.Navigator>
  );
};

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

export default BottomTabNavigator;
