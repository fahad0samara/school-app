// src/components/GlobalStyle.js
import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { useDarkMode } from './src/Hooks/darkmode/useDarkMode';


const GlobalStyle = ({ children }) => {
  const isDarkMode = useDarkMode();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? '#333' : '#fff',
  };

  const textStyle: TextStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Dark Mode is {isDarkMode ? 'On' : 'Off'}</Text>
      {children}
    </View>
  );
};

export default GlobalStyle;
