import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { View, Switch, StyleSheet } from 'react-native';
import { RootState } from '../../redux/store';
import { toggleDarkMode } from '../../redux/DarkMod/darkModeSlice';

const DarkModeToggle = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkmode.darkmode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View style={styles.container}>
      <Switch
        value={isDarkMode}
        onValueChange={handleToggle}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default DarkModeToggle;