import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { images } from '../../../constants';
import { useDarkMode } from '../../../Hooks/darkmode/useDarkMode';

const PaymentMethod = ({ onContinue }) => {
  const { t } = useTranslation();  
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { colors, isDarkMode } = useDarkMode(); 

  const paymentMethods = [
    { id: 1, name: t('payment.knet'), image: images.Kent  }, 
    { id: 2, name: t('payment.visa'), image: images.visaCard  },
    { id: 3, name: t('payment.samsung'), image: images.Sumsunpay },
    { id: 4, name: t('payment.other'), image: images.other },
  ];

  const handleSelectMethod = (id) => {
    setSelectedMethod(id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={[styles.title, { color: colors.text }]}>{t('payment.method')}</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentOption,
              { backgroundColor: colors.card },
              selectedMethod === method.id && styles.selected,
            ]}
            onPress={() => handleSelectMethod(method.id)}
          >
            <Image source={method.image} style={styles.icon} />
            <Text style={[styles.paymentText, { color: colors.text }]}>{method.name}</Text>
            <View
              style={[
                styles.checkbox,
                selectedMethod === method.id && styles.checkboxSelected,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Button pinned to the bottom */}
      <TouchableOpacity
        onPress={onContinue}
        style={[styles.continueButton, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>{t('payment.continue')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    paddingHorizontal: 22,
    borderRadius: 18.92,
    width: 350,
    height: 58,
    marginBottom: 10,
    position: 'relative',
  },
  selected: {
    borderColor: '#FE8A54',
    borderWidth: 1,
  },
  icon: {
    width: 45,
    height: 33,
    marginRight: 15,
    borderRadius: 6,
  },
  paymentText: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#FE8A54',
    borderWidth: 1,
    borderRadius: 15,
    opacity: 0.8,
  },
  checkboxSelected: {
    backgroundColor: '#FE8A54',
  },
  continueButton: {
    position: 'absolute',
    bottom: 20, 
    left: 20,
    right: 20,
    padding: 15,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentMethod;
