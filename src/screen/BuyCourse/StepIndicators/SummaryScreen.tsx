import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import moment from "moment"; // For dynamic date handling
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../../Hooks/darkmode/useDarkMode";

const SummaryScreen = ({ onContinue }) => {
  const { t } = useTranslation();
  const currentDate = moment().format("DD-MM-YYYY"); // Get current date dynamically
  const { colors, isDarkMode } = useDarkMode();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Overview Section */}
      <View style={[styles.overviewContainer, { backgroundColor: colors.card }]}>
        <View style={styles.courseInfo}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/08/14/11/49/mathematics-2640219_1280.jpg",
            }} 
            style={styles.courseImage}
          />
          <View style={styles.courseTextContainer}>
            <Text style={[styles.courseName, { color: colors.text }]}>Calculus 1 (Math 131)</Text>
            <Text style={[styles.teacherName, { color: colors.text }]}>Muhammad Yashi</Text>
            <Text style={[styles.price, { color: colors.text }]}>45 K.D</Text>
          </View>
        </View>
      </View>

      {/* Course and Purchase Details */}
      <View style={[styles.detailsContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.detailsText, { color: colors.text }]}>
          {t('Summary.courseName')}: Calculus 1 (Math 131)
        </Text>
        <Text style={[styles.detailsText, { color: colors.text }]}>
          {t('Summary.teacher')}: Muhammad Yashi
        </Text>
        <Text style={[styles.detailsText, { color: colors.text }]}>
          {t('Summary.lessons')}: 20
        </Text>
        <Text style={[styles.detailsText, { color: colors.text }]}>
          {t('Summary.language')}: English/Arabic
        </Text>
      </View>

      <View style={[styles.purchaseDetailsContainer, { backgroundColor: colors.card }]}>
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
          <Text style={[styles.finalPriceButtonText, { color: colors.primary }]}>{t('Summary.finalPrice')}: 36 K.D</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity onPress={onContinue} style={[styles.continueButton, { backgroundColor: colors.primary }]}>
        <Text style={[styles.buttonText]}>{t('Summary.continue')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  overviewContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0", 
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseImage: {
    width: 85,
    height: 78,
    marginRight: 15,
    borderRadius: 10,
  },
  courseTextContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
  teacherName: {
    fontSize: 14,
  },
  detailsContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0", 
  },
  detailsText: {
    fontSize: 14,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 4,
  },
  purchaseDetailsContainer: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0", 
    marginBottom: 20,
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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
    borderColor: "#000",
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
});

export default SummaryScreen;
