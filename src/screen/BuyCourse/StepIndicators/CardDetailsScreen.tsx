import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import PaymentModal from "./PaymentModal";

const CardDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
    isSuccess: true,
  });

  const handlePayNow = () => {
    const paymentSuccess = Math.random() > 0.5; // Simulate success or failure

    if (paymentSuccess) {
      setModalContent({
        title: "Congratulations",
        message: "Your Payment is Successfully Processed.",
        buttonText: "Start Learning",
        isSuccess: true,
      });
    } else {
      setModalContent({
        title: "Payment Failed",
        message:
          "There was an issue processing your payment. Please try again.",
        buttonText: "Retry Payment",
        isSuccess: false,
      });
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.sectionTitle}>Add Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Card number"
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="CVV Number"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Expire Date"
          />
        </View>

        <TextInput style={styles.input} placeholder="Cardholder name" />

        <View style={styles.purchaseDetailsContainer}>
          <Text style={styles.sectionTitle}>Purchase Details</Text>

          <View style={styles.purchaseDetail}>
            <Text>Date</Text>
            <Text>01-07-2024</Text>
          </View>

          <View style={styles.purchaseDetail}>
            <Text>Price of course</Text>
            <Text>45 K.D</Text>
          </View>

          <View style={styles.purchaseDetail}>
            <Text>Coupon</Text>
            <Text>Added 20% Discount</Text>
          </View>

          <TouchableOpacity style={styles.finalPriceButton}>
            <Text style={styles.finalPriceButtonText}>Final Price: 36 K.D</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      {/* Generalized Modal for Success or Error */}
      <PaymentModal
        isVisible={isModalVisible}
        onClose={closeModal}
        title={modalContent.title}
        message={modalContent.message}
        buttonText={modalContent.buttonText}
        isSuccess={modalContent.isSuccess}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4fa",
    padding: 20,
  },
  scrollView: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    width: 350,
    height: 48,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",

    // Shadow properties for iOS (and fallback for Android)
    shadowColor: "#698296",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,

    // For Android shadows, we use elevation
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallInput: {
    width: "48%", // Adjust to make both inputs sit side-by-side
  },

  // New Purchase Details Styling
  purchaseDetailsContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,

    // Shadow
    shadowColor: "#698296",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  purchaseDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  // Final Price Button Styling
  finalPriceButton: {
    width: 320,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18.92,
    backgroundColor: "#FFFFFF",
    borderColor: "#000",
    borderWidth: 1,

    // Shadow
    shadowColor: "#698296",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  finalPriceButtonText: {
    color: "#FE8A54",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Pay Now Button
  payButton: {
    position: "absolute",
    bottom: 20, // Fixed at bottom
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CardDetails;
