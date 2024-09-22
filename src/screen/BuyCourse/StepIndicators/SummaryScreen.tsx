import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import moment from "moment"; // For dynamic date handling

const SummaryScreen = ({ onContinue }) => {
  const currentDate = moment().format("DD-MM-YYYY"); // Get current date dynamically

  return (
    <View style={styles.container}>
      {/* Overview Section */}
      <View style={styles.overviewContainer}>
        <View style={styles.courseInfo}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/08/14/11/49/mathematics-2640219_1280.jpg",
            }} // Placeholder image URL// Update with your actual image location
            style={styles.courseImage}
          />
          <View style={styles.courseTextContainer}>
            <Text style={styles.courseName}>Calculus 1 (Math 131)</Text>
               <Text style={styles.teacherName}>Muhammad Yashi</Text>
            <Text style={styles.price}>45 K.D</Text>
         
          </View>
        </View>
      </View>

      {/* Course and Purchase Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>
          Course Name: Calculus 1 (Math 131)
        </Text>
        <Text style={styles.detailsText}>Teacher: Muhammad Yashi</Text>
        <Text style={styles.detailsText}>Lessons: 20</Text>
        <Text style={styles.detailsText}>Language: English/Arabic</Text>
      </View>
 
   
      <View style={styles.purchaseDetailsContainer}>
     <Text style={styles.sectionTitle}>Purchase Details :</Text>
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

      {/* Continue Button */}
      <TouchableOpacity onPress={onContinue} style={styles.continueButton}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Push content and button apart
    padding: 20,
  },
  overviewContainer: {
    backgroundColor: "#FFFFFF",
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
    color: "#333333",
  },
  price: {
    fontSize: 16,
    color: "#FF3B30",
    marginTop: 5,
  },
  teacherName: {
    fontSize: 14,
    color: "#666666",
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  detailsText: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 5,
  },
  sectionTitle:{
    fontSize: 16,
    color: "#1F1F1F",
    marginVertical:4
    },
  

  purchaseDetailsContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  finalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF3B30",
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: "#007AFF",
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

});

export default SummaryScreen;
