import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import useLanguage from '../../Hooks/language/useLanguage';
import useActions from '../../Hooks/language/useActions';
import Button from '../../components/Button';
import { COLORS, SIZES } from '../../constants/theme';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();

  return (
    <View style={[styles.container, { direction: isRTL ? 'rtl' : 'ltr' }]}>
      <Text style={[styles.title, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
        {t('currentLanguage')}: {language}
      </Text>
      <TextInput
        style={[
          styles.input,
          { textAlign: isRTL ? 'right' : 'left', writingDirection: isRTL ? 'rtl' : 'ltr' }
        ]}
        placeholder={t('enterText')}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/icon/google.png')}
          style={[
            styles.logo,
            { alignSelf: isRTL ? 'flex-end' : 'flex-start' }
          ]}
        />
      </View>
      <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
        {t('someText')}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: COLORS.primary }}>{t('clickMe')}</Text>
      </TouchableOpacity>
      <Button onPress={() => { setLanguage('ar'); setIsRTL(true); }}>
        {t('switchToArabic')}
      </Button>
      <Button onPress={() => { setLanguage('en'); setIsRTL(false); }}>
        {t('switchToEnglish')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: COLORS.primary,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    padding: 8,
    marginBottom: 20,
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30,
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
});

export default MyComponent;
