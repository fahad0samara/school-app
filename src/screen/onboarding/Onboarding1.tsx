import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../Hooks/language/useLanguage';
import useActions from '../../Hooks/language/useActions';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import Button from '../../components/Button';
import DotsView from '../../components/DotsView';
import PageContainer from '../../components/PageContainer';
import Onboarding1Styles from './styles/OnboardingStyles';
import { COLORS, illustrations, images } from '../../constants';

const Onboarding1 = ({ navigation }) => {
  const [progress, setProgress] = useState(0.67); // Set initial progress for this screen
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();

  const handleNext = () => {
    setProgress(0.67); // Update progress
    navigation.navigate('Onboarding2');
  };

  return (
    <SafeAreaView style={[Onboarding1Styles.container, { backgroundColor: colors.background }]}>
      <PageContainer>
        <View style={Onboarding1Styles.contentContainer}>
          <Image
            source={illustrations.Onboarding0}
            resizeMode="contain"
            style={Onboarding1Styles.illustration}
          />
       
          <View style={Onboarding1Styles.buttonContainer}>
            <View style={Onboarding1Styles.titleContainer}>
              <Text style={[Onboarding1Styles.title, { color: colors.text }]}>{t('Onboarding.Title')}</Text>
              <Text style={Onboarding1Styles.subTitle}>{t('Onboarding.Subtitle')}</Text>
            </View>

            <Text style={[Onboarding1Styles.description, { color: colors.text }]}>{t('Onboarding.Description1')}</Text>

            <View style={Onboarding1Styles.dotsContainer}>
              <DotsView progress={progress} numDots={3} /> 
            </View>
            <Button
              title={t('Onboarding.Next')}
              filled
              onPress={handleNext}
              style={Onboarding1Styles.nextButton}
            />
            <Button
              title={t('Onboarding.Skip')}
              onPress={() => navigation.navigate('loginScreen')}
              textColor={COLORS.primary}
              style={Onboarding1Styles.skipButton}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Onboarding1;
