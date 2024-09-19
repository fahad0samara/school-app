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

const Onboarding2 = ({ navigation }) => {
  const [progress, setProgress] = useState(100); 
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();

  const handleNext = () => {
    setProgress(1); // Update progress
    navigation.navigate('loginScreen');
  };

  return (
    <SafeAreaView style={[Onboarding1Styles.container, { backgroundColor: colors.background }]}>
      <PageContainer>
        <View style={Onboarding1Styles.contentContainer}>
          <Image
            source={illustrations.Onboarding2}
            resizeMode="contain"
            style={Onboarding1Styles.illustration}
          />
     
          <View style={[Onboarding1Styles.buttonContainer, { backgroundColor: colors.background }]}>
            <View style={Onboarding1Styles.titleContainer}>
              <Text style={[Onboarding1Styles.title, { color: colors.text }]}>{t('Onboarding.Title2')}</Text>
              <Text style={Onboarding1Styles.subTitle}>{t('Onboarding.SubTitle2')}</Text>
            </View>

            <Text style={[Onboarding1Styles.description, { color: colors.text }]}>{t('Onboarding.Description2')}</Text>

            <View style={Onboarding1Styles.dotsContainer}>
              <DotsView progress={progress} numDots={3} /> 
            </View>
            <Button
              title={t('Onboarding.Next2')}
              filled
              onPress={handleNext}
              style={Onboarding1Styles.nextButton}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Onboarding2;
