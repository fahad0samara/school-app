import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppIcon from "../../../utils/AppIcon";

const StepIndicator = ({ currentStep, setStep }) => {
  // Title based on the current step
  const getTitle = () => {
    switch (currentStep) {
      case 1:
        return "Summary";
      case 2:
        return "Payment Method";
      case 3:
        return "Confirmation";
      default:
        return "";
    }
  };

  return (
    <View style={styles.container}>
 
      
      {/* Back button (only show if not on the first step) */}
      {currentStep > 1 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setStep(currentStep - 1)}
        >
          <AppIcon
            name="arrow-left"
            size={24}
            color="#333"
            iconSet="FontAwesome"
          />
        </TouchableOpacity>
      )}

      {/* Dynamic title */}
      <Text style={styles.title}>{getTitle()}</Text>
     <View
   style={styles.container1}
      >

      <View style={styles.stepIndicatorContainer}>
        {/* Step 1 */}
        <TouchableOpacity
          onPress={() => setStep(1)}
          style={styles.stepContainer}
        >
          <View
            style={[styles.circle, currentStep === 1 && styles.activeCircle]}
          >
            <Text style={styles.circleText}>1</Text>
          </View>
          <Text style={styles.label}>Overview</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        {/* Step 2 */}
        <TouchableOpacity
          onPress={() => setStep(2)}
          style={styles.stepContainer}
        >
          <View
            style={[styles.circle, currentStep === 2 && styles.activeCircle]}
          >
            <Text style={styles.circleText}>2</Text>
          </View>
          <Text style={styles.label}>Payment method</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        {/* Step 3 */}
        <TouchableOpacity
          onPress={() => setStep(3)}
          style={styles.stepContainer}
        >
          <View
            style={[styles.circle, currentStep === 3 && styles.activeCircle]}
          >
            <Text style={styles.circleText}>3</Text>
          </View>
          <Text style={styles.label}>Confirmation</Text>
        </TouchableOpacity>
      </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    
   
  },
  container1:{
    paddingVertical: 10,
   
    padding:20,
    marginHorizontal:5,
    borderRadius:16
    },
  
  backButton: {
    position: "absolute",
    left: 15,
    top: 15,
    zIndex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
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
    color: "#666666",
  },
  line: {
    width: 50,
    height: 3,
    backgroundColor: "#D1D1D1",
    
  },
});

export default StepIndicator;
