import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const PaymentMethod = ({onContinue}) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    { id: 1, name: 'KNET', image: require('../../../../assets/images/Splash.jpg') }, 
    { id: 2, name: 'Visa card', image: require('../../../../assets/images/Splash.jpg') },
    { id: 3, name: 'Samsung Pay', image: require('../../../../assets/images/Splash.jpg') },
    { id: 4, name: 'Other', image: require('../../../../assets/images/Splash.jpg') },
  ];

  const handleSelectMethod = (id) => {
    setSelectedMethod(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentOption,
              selectedMethod === method.id && styles.selected,
            ]}
            onPress={() => handleSelectMethod(method.id)}
          >
            <Image source={method.image} style={styles.icon} />
            <Text style={styles.paymentText}>{method.name}</Text>
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
       style={styles.continueButton}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4fa',
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
    backgroundColor: '#fff',
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
    width: 40,
    height: 40,
    marginRight: 15,
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
    backgroundColor: '#007bff',
    padding: 15,

    alignItems: 'center',
      
    paddingVertical: 15,
    borderRadius: 25,
 
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentMethod;
