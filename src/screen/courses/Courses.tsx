import React from 'react';
import { View, Text, Button, StyleSheet, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

const Courses = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('bottomNavigation.home')}</Text>
      <Button
        title={t('profile')}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Use I18nManager.isRTL to adjust styles for RTL
    paddingHorizontal: I18nManager.isRTL ? 20 : 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    // Text alignment for RTL support
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

export default Courses;
