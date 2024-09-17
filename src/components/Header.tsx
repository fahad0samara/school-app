import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../Hooks/darkmode/useDarkMode';
import { COLORS, SIZES } from '../constants/theme';

const Header = ({ title = '', iconType = '', imageSource = null }) => {
  const navigation = useNavigation();
  const { colors } = useDarkMode();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {iconType === 'icon' ? (
          <Feather
            name="arrow-left"
            size={24}
            color={colors.text}
            style={styles.backIcon}
          />
        ) : (
          <Image
            source={imageSource}
            resizeMode="contain"
            style={[styles.backIcon, { tintColor: colors.text }]}
          />
        )}
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 16
  },
  title: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.black
  }
});

export default Header;
