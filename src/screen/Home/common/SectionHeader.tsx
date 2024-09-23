import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../../../Hooks/darkmode/useDarkMode';
import { COLORS } from '../../../constants';


interface SectionHeaderProps {
  title: string;
  seeAllText?: string;
  onSeeAllPress?: () => void;
  fontSize?: number; // New prop for custom font size
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  seeAllText, 
  onSeeAllPress, 
  fontSize = 20 // Default font size
}) => {
  const { isDarkMode } = useDarkMode();
  const textColor = isDarkMode ? COLORS.white : COLORS.black;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor, fontSize }]}>{title}</Text>
      {seeAllText && (
        <Text style={[styles.seeAll]} onPress={onSeeAllPress}>
          {seeAllText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default SectionHeader;
