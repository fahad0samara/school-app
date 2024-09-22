import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions, StatusBar } from 'react-native';
import StepIndicator from './StepIndicator';  
import SummaryScreen from './SummaryScreen';
import PaymentMethodScreen from './PaymentMethodScreen';
import CardDetailsScreen from './CardDetailsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CoursePurchase = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleStepChange = (step) => {
    Animated.timing(slideAnim, {
      toValue: -(step - 1) * width,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setCurrentStep(step);
  };

  useEffect(() => {
    handleStepChange(currentStep);
  }, [currentStep]);

  return (
        <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4fa" />
    <View style={styles.container}>
      <StepIndicator currentStep={currentStep} setStep={handleStepChange} />
      <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.screen}>
          <SummaryScreen onContinue={() => handleStepChange(2)} />
        </View>
        <View style={styles.screen}>
          <PaymentMethodScreen onContinue={() => handleStepChange(3)} />
        </View>
        <View style={styles.screen}>
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
  backgroundColor: '#f0f4fa',

  },
  slideContainer: {
    flexDirection: 'row',
    width: width * 3,
    flex: 1,
  },
  screen: {
    width: width,
    flex: 1, // Allows the screen content to take up available space
    justifyContent: 'space-between', // Space between content and button
    paddingVertical: 25, // Add padding to give some spacing around elements
  },
});

export default CoursePurchase;
