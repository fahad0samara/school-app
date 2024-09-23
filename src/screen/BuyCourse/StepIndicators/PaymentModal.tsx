import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDarkMode } from "../../../Hooks/darkmode/useDarkMode"; 

const PaymentModal = ({ isVisible, onClose, title, message, buttonText, isSuccess }) => {
  const { colors } = useDarkMode(); 

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          {/* Star icons for success */}
          {isSuccess ? (
            <View style={styles.successIconContainer}>
              <FontAwesome5 name="star" size={30} color="#FFD700" />
              <FontAwesome5 name="star" size={30} color="#FFD700" />
              <FontAwesome5 name="star" size={30} color="#FFD700" />
              <FontAwesome5 name="star" size={30} color="#FFD700" />
            </View>
          ) : (
            /* Error Icon */
            <MaterialIcons name="error" size={50} color="#FF0000" style={styles.icon} />
          )}

          <Text style={[styles.title, { color: isSuccess ? '#4CAF50' : '#FF0000' }]}>
            {title}
          </Text>

          <Text style={[styles.message, { color: colors.text }]}>{message}</Text>

          {/* Conditionally render "Watch e-receipt" or error-related text */}
          {isSuccess ? (
            <TouchableOpacity>
              <Text style={[styles.watchReceiptText, { color: '#4CAF50' }]}>Watch e-receipt</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Text style={[styles.errorHelpText, { color: '#FF0000' }]}>Contact Support or Retry Payment</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: isSuccess ? '#4CAF50' : '#FF0000' }]} onPress={onClose}>
            <Text style={styles.actionButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  successIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  watchReceiptText: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorHelpText: {
    fontSize: 16,
    marginBottom: 20,
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentModal;
