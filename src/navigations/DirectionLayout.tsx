import React, { useEffect, useState } from 'react';
import { View, StyleSheet, I18nManager, LayoutAnimation } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import i18n from '../config/translations';

const LayoutWrapper = ({ children }) => {
  const [layoutDirection, setLayoutDirection] = useState(I18nManager.isRTL ? 'rtl' : 'ltr');
  const language = useSelector((state: RootState) => state.language.language);
  const isRTL = useSelector((state: RootState) => state.language.isRTL);

  useEffect(() => {
    const changeLang = async () => {
      try {
        await i18n.changeLanguage(language);
        I18nManager.forceRTL(isRTL);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate layout change
        setLayoutDirection(isRTL ? 'rtl' : 'ltr');
      } catch (error) {
        console.error('Language change error:', error);
      }
    };
    changeLang();
  }, [language, isRTL]);

  return (
    <View style={[styles.container, { direction: layoutDirection }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: 'aliceblue',
  },
});

export default LayoutWrapper;
