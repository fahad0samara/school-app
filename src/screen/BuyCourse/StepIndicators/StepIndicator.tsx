import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppIcon from "../../../utils/AppIcon";
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../../Hooks/darkmode/useDarkMode"; // Import the dark mode hook

const StepIndicator = ({ currentStep, setStep }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl'; // Check if the current language is RTL
  const { colors, isDarkMode } = useDarkMode(); // Get colors and dark mode state

  const getTitle = () => {
    switch (currentStep) {
      case 1:
        return isRTL ? "ملخص" : "Summary"; // Summary
      case 2:
        return isRTL ? "طريقة الدفع" : "Payment Method"; // Payment Method
      case 3:
        return isRTL ? "تأكيد" : "Confirmation"; // Confirmation
      default:
        return "";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Back button (only show if not on the first step) */}
      {currentStep > 1 && (
        <TouchableOpacity
          style={[styles.backButton, isRTL ? styles.backButtonRTL : {}]}
          onPress={() => setStep(currentStep - 1)}
        >
          <AppIcon
            name={isRTL ? "arrow-right" : "arrow-left"}
            size={24}
            color={colors.text} // Use dynamic color
            iconSet="FontAwesome"
          />
        </TouchableOpacity>
      )}

      {/* Dynamic title */}
      <Text style={[styles.title, { color: colors.text }]}>{getTitle()}</Text>
      <View style={styles.stepIndicatorContainer}>
        {/* Step 1 */}
        <TouchableOpacity onPress={() => setStep(1)} style={styles.stepContainer}>
          <View style={[styles.circle, currentStep === 1 && styles.activeCircle]}>
            <Text style={styles.circleText}>1</Text>
          </View>
          <Text style={[styles.label, { color: colors.text }]}>{isRTL ? "نظرة عامة" : "Overview"}</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        {/* Step 2 */}
        <TouchableOpacity onPress={() => setStep(2)} style={styles.stepContainer}>
          <View style={[styles.circle, currentStep === 2 && styles.activeCircle]}>
            <Text style={styles.circleText}>2</Text>
          </View>
          <Text style={[styles.label, { color: colors.text }]}>{isRTL ? "طريقة الدفع" : "Payment method"}</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        {/* Step 3 */}
        <TouchableOpacity onPress={() => setStep(3)} style={styles.stepContainer}>
          <View style={[styles.circle, currentStep === 3 && styles.activeCircle]}>
            <Text style={styles.circleText}>3</Text>
          </View>
          <Text style={[styles.label, { color: colors.text }]}>{isRTL ? "تأكيد" : "Confirmation"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 15,
    zIndex: 1,
  },
  backButtonRTL: {
    left: undefined,
    right: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  stepContainer: {
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E2EEF7",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#7FB2D6",
  },
  activeCircle: {
    backgroundColor: "#007AFF",
  },
  circleText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  label: {
    marginTop: 5,
    fontSize: 12,
  },
  line: {
    width: 50,
    height: 3,
    backgroundColor: "#D1D1D1",
  },
});

export default StepIndicator;
