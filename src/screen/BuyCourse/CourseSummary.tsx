import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CourseSummary = () => {
  const [enrollDate, setEnrollDate] = useState(null); // State to hold the dynamic date

  // Function to handle when user clicks enroll and set the date dynamically
  const handleEnroll = () => {
    const currentDate = new Date(); // Get current date
    const formattedDate = formatDate(currentDate); // Format date
    setEnrollDate(formattedDate); // Set the dynamic date
  };

  // Format date as DD-MM-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicatorContainer}>
        <View style={[styles.step, styles.activeStep]}>
          <Text style={styles.stepText}>1</Text>
          <Text style={styles.stepLabel}>Overview</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepText}>2</Text>
          <Text style={styles.stepLabel}>Payment method</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepText}>3</Text>
          <Text style={styles.stepLabel}>Confirmation</Text>
        </View>
      </View>

      {/* Overview Section */}
      <View style={styles.overviewContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.courseOverview}>
          <Image
            source={{ uri: 'https://example.com/course-image.png' }}
            style={styles.courseImage}
          />
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Calculus 1 (Math 131)</Text>
            <Text style={styles.teacherName}>Muhammad Yashri</Text>
            <Text style={styles.coursePrice}>45 K.D</Text>
          </View>
        </View>
        <View style={styles.courseDetails}>
          <Text style={styles.detailLabel}>Course name: </Text>
          <Text style={styles.detailValue}>Calculus 1 (Math 131)</Text>
        </View>
        <View style={styles.courseDetails}>
          <Text style={styles.detailLabel}>Teacher name: </Text>
          <Text style={styles.detailValue}>Muhammad Yashri</Text>
        </View>
        <View style={styles.courseDetails}>
          <Text style={styles.detailLabel}>Lessons: </Text>
          <Text style={styles.detailValue}>20</Text>
        </View>
        <View style={styles.courseDetails}>
          <Text style={styles.detailLabel}>Language: </Text>
          <Text style={styles.detailValue}>English/Arabic</Text>
        </View>
      </View>

      {/* Purchase Details Section */}
      <View style={styles.purchaseDetailsContainer}>
        <Text style={styles.sectionTitle}>Purchase Details</Text>
        <View style={styles.purchaseDetails}>
          <Text style={styles.detailLabel}>Date: </Text>
          <Text style={styles.detailValue}>
            {enrollDate ? enrollDate : 'Not enrolled yet'}
          </Text>
        </View>
        <View style={styles.purchaseDetails}>
          <Text style={styles.detailLabel}>Price of course: </Text>
          <Text style={styles.detailValue}>45 K.D</Text>
        </View>
        <View style={styles.purchaseDetails}>
          <Text style={styles.detailLabel}>Coupon: </Text>
          <Text style={styles.detailValue}>Added 20% Discount</Text>
        </View>
        <View style={styles.finalPriceContainer}>
          <Text style={styles.finalPriceText}>Final Price: 36 K.D</Text>
        </View>
      </View>

      {/* Enroll and Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleEnroll}>
        <Text style={styles.continueButtonText}>Enroll & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  activeStep: {
    backgroundColor: '#89CFF0',
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepLabel: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
  overviewContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3, // for shadow effect on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teacherName: {
    color: '#A9A9A9',
    marginTop: 5,
  },
  coursePrice: {
    color: '#FF6600',
    fontWeight: 'bold',
    marginTop: 5,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 14,
    color: '#555',
  },
  purchaseDetailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  purchaseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  finalPriceContainer: {
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  finalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6600',
  },
  continueButton: {
    backgroundColor: '#89CFF0',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseSummary;
