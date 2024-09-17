import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StatusBar, StyleSheet, View, I18nManager, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import AppNavigator from './src/navigations';
import LayoutWrapper from './src/navigations/DirectionLayout';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDarkMode } from './src/Hooks/darkmode/useDarkMode';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from './src/constants/theme';
import { FONTS } from './src/constants/fonts';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

const App = () => {
 
  const { isDarkMode, colors } = useDarkMode();
  const [fontsLoaded] = useFonts(FONTS);


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);



  if (!fontsLoaded) {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <LayoutWrapper>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <AppNavigator  /> 
      </LayoutWrapper>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    width,
    height,

    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
