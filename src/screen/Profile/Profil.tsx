import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageSwitchButton from '../../Hooks/language/LanguageSwitchButton';
import useLanguage from '../../Hooks/language/useLanguage';
import DarkModeToggle from '../../Hooks/darkmode/DarkModeToggle';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const language = useLanguage();
    const isDarkMode = useSelector((state: RootState) => state.darkmode.darkmode);


  return (
   <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff',
        
        }]}>
      <Text style={styles.title}>{t('bottomNavigation.profile')}</Text>
      <Button
        title={t('logout')}
        onPress={() => {
          // Handle logout action
          alert(t('alert.logoutTxt'));
        }}
      />
      <View style={styles.languageContainer}>
        <Text>Current Language: {language === 'en' ? 'English' : 'Arabic'}</Text>
        <LanguageSwitchButton language={language} newLanguage={language === 'en' ? 'ar' : 'en'} />
      </View>
      <DarkModeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   

  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  languageContainer: {
    marginVertical: 20,
  },
});

export default ProfileScreen;
