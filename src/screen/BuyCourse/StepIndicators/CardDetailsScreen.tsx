import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import PaymentModal from "./PaymentModal";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useDarkMode } from "../../../Hooks/darkmode/useDarkMode";

const CardDetails = () => {
  const currentDate = moment().format("DD-MM-YYYY"); // Get current date dynamically
  const { t } = useTranslation();
  const { colors, isDarkMode } = useDarkMode(); 
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
        title: t('CardDetails.congratulations'),
        message: t('CardDetails.paymentSuccessMessage'),
        buttonText: t('CardDetails.startLearning'),
        isSuccess: true,
      });
    } else {
      setModalContent({
        title: t('CardDetails.paymentFailed'),
        message: t('CardDetails.paymentFailedMessage'),
        buttonText: t('CardDetails.retryPayment'),
        isSuccess: false,
      });
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('CardDetails.addDetails')}</Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
          placeholder={t('CardDetails.cardNumber')}
          placeholderTextColor={colors.text}
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput, { backgroundColor: colors.card, borderColor: colors.border }]}
            placeholder={t('CardDetails.cvv')}
            placeholderTextColor={colors.text}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput, { backgroundColor: colors.card, borderColor: colors.border }]}
            placeholder={t('CardDetails.expiryDate')}
           placeholderTextColor={colors.text}
          />
        </View>

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
          placeholder={t('CardDetails.cardHolderName')}
       placeholderTextColor={colors.text}
        />

        {/* Purchase Details Section */}
        <View style={[styles.purchaseDetailsContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('Summary.title')}:</Text>
          <View style={styles.purchaseDetail}>
            <Text style={{ color: colors.text }}>{t('Summary.date')}</Text>
            <Text style={{ color: colors.text }}>{currentDate}</Text>
          </View>

          <View style={styles.purchaseDetail}>
            <Text style={{ color: colors.text }}>{t('Summary.coursePrice')}</Text>
            <Text style={{ color: colors.text }}>45 K.D</Text>
          </View>

          <View style={styles.purchaseDetail}>
            <Text style={{ color: colors.text }}>{t('Summary.coupon')}</Text>
            <Text style={{ color: colors.text }}>{t('Summary.discount')}</Text>
          </View>

          <TouchableOpacity style={[styles.finalPriceButton, { backgroundColor: colors.card }]}>
            <Text style={[styles.finalPriceButtonText, { color: colors.primary }]}>
              {t('Summary.finalPrice')}: 36 K.D
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.payButton, { backgroundColor: colors.primary }]} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>{t('CardDetails.payNow')}</Text>
      </TouchableOpacity>

      {/* Payment Modal */}
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
    borderRadius: 14,
    width: 350,
    height: 48,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    shadowColor: "#698296",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallInput: {
    width: "48%",
  },
  purchaseDetailsContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
  finalPriceButton: {
    width: 320,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18.92,
    borderWidth: 1,
    shadowColor: "#698296",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  finalPriceButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  payButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
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
