import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../Hooks/darkmode/useDarkMode';
import { COLORS } from '../constants/theme';


const OrSeparator = ({ text }) => {
 const { colors,isDarkMode  } = useDarkMode();

  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: isDarkMode ? COLORS.gray3 : COLORS.greyscale900 }]} />
      <Text style={[styles.orText, { color: isDarkMode ? COLORS.white : COLORS.black }]}>{text}</Text>
      <View style={[styles.line, { backgroundColor: isDarkMode ? COLORS.gray3 : COLORS.greyscale900 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 19.25,
    fontFamily: "medium",
    color: COLORS.black,
    textAlign: "center",
  },
});

export default OrSeparator;