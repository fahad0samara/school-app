import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions, StatusBar } from 'react-native';
import StepIndicator from './StepIndicator';  
import SummaryScreen from './SummaryScreen';
import PaymentMethodScreen from './PaymentMethodScreen';
import CardDetailsScreen from './CardDetailsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../../Hooks/darkmode/useDarkMode"; // Import dark mode hook

const { width } = Dimensions.get('window');

const CoursePurchase = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl'; // Check if the current language is RTL
  const { colors } = useDarkMode(); // Get colors from the dark mode hook
  const [currentStep, setCurrentStep] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleStepChange = (step) => {
    Animated.timing(slideAnim, {
      toValue: (isRTL ? (step - 1) * width : -(step - 1) * width),
      duration: 300,
      useNativeDriver: true,
    }).start();
    setCurrentStep(step);
  };

  useEffect(() => {
    handleStepChange(currentStep);
  }, [currentStep]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar  backgroundColor={colors.background} />
      <View style={styles.container}>
        <StepIndicator currentStep={currentStep} setStep={handleStepChange} />
        <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
          <View style={[styles.screen, { backgroundColor: colors.card }]}>
            <SummaryScreen onContinue={() => handleStepChange(2)} />
          </View>
          <View style={[styles.screen, { backgroundColor: colors.card }]}>
            <PaymentMethodScreen onContinue={() => handleStepChange(3)} />
          </View>
          <View style={[styles.screen, { backgroundColor: colors.card }]}>
            <CardDetailsScreen onPayNow={() => alert('Payment Successful')} />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flexDirection: 'row',
    width: width * 3,
    flex: 1,
  },
  screen: {
    width: width,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});

export default CoursePurchase;
