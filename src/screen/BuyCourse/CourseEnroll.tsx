import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

const CourseEnroll = () => {
  const refRBSheet = useRef();

  const handleEnroll = () => {
    // Enrollment logic goes here
    console.log("Enrolled successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Button to open the bottom sheet */}
      <TouchableOpacity style={styles.openButton} onPress={() => refRBSheet.current.open()}>
        <Text style={styles.openButtonText}>Open Enrollment Details</Text>
      </TouchableOpacity>

      {/* Bottom Sheet for enrollment */}
      <RBSheet
        ref={refRBSheet}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            backgroundColor: '#f9f9f9',
          }
        }}
      >
        <View>
          {/* Promo Code Input with Apply Button inside the input */}
          <View style={styles.promoCodeContainer}>
            <TextInput
              placeholder="Promo code"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Course Information */}
          <View style={styles.courseDetails}>
            <Text style={styles.label}>Course name: </Text>
            <Text style={styles.value}>Calculus 1 (Math 131)</Text>
          </View>
          <View style={styles.courseDetails}>
            <Text style={styles.label}>Teacher name: </Text>
            <Text style={styles.value}>Muhammad Yashri</Text>
          </View>
          <View style={styles.courseDetails}>
            <Text style={styles.label}>Price of course: </Text>
            <Text style={styles.value}>45 K.D</Text>
          </View>

          {/* Enroll Now Button */}
          <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
            <Text style={styles.buttonText}>Enroll Now - 45 K.D</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#FF6600',
    padding: 15,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    position: 'relative', // Required to position button inside input
    marginVertical: 10,
  },
  input: {
    width: 350,
    height: 48,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 150, // Spacing for button
    borderRadius: 18.92, // Rounded input
    borderColor: '#CDCDCD',
    borderWidth: 1,
    boxShadow: '2.36px 8.28px 18.92px 0px #69829614',
    backgroundColor: '#fff',
  },
  applyButton: {
    position: 'absolute',
    top: 3,
    right: 0,
    width: 123,
    height: 42,
    backgroundColor: '#FE8A54',
    borderRadius: 18.92,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '7.09px 33.11px 34.29px 0px #69829612',
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  enrollButton: {
    marginTop: 20,
    backgroundColor: '#89CFF0',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseEnroll;
