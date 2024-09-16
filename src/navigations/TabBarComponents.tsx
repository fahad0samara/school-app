// TabBarComponents.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TabBarLabelProps {
  focused: boolean;
  color: string;
  label: string;
}

interface TabBarIconProps {
  focused: boolean;
  icon: keyof typeof FontAwesome.glyphMap;
  color: string;
}

export const TabBarLabel: React.FC<TabBarLabelProps> = ({ focused, color, label }) => {
  return (
    <Text
      style={[
        {
          fontSize: 12,
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

export const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, icon, color }) => {
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
