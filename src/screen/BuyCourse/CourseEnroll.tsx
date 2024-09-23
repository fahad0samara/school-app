import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';

const CourseEnroll = ({ enrollSheetRef, course }) => {
  const navigation = useNavigation(); // Access navigation
  const refRBSheet = useRef();
  const { t } = useTranslation();
  const { colors } = useDarkMode(); // Get colors from the dark mode hook

  const handleEnroll = () => {
    // Close the bottom sheet first
    enrollSheetRef.current.close();

    // Navigate to CourseSummary after closing the sheet
    navigation.navigate("CoursePurchase");

    console.log("Enrolled successfully!");
  };

  return (
    <RBSheet
      ref={enrollSheetRef}  // Use the passed ref here
      height={300}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          backgroundColor: colors.card, 
        }
      }}
    >
      <View>
        {/* Promo Code Input */}
        <View style={styles.promoCodeContainer}>
          <TextInput
            placeholder={t('Enroll.promoCodePlaceholder')}
            style={[styles.input, { backgroundColor: colors.background, color: colors.text }]} 
            placeholderTextColor={colors.text} 
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>{t('Enroll.applyButton')}</Text>
          </TouchableOpacity>
        </View>

        {/* Course Information */}
        <View style={styles.courseDetails}>
          <Text style={[styles.label, { color: colors.text }]}>{t('Enroll.courseNameLabel')}</Text>
          <Text style={[styles.value, { color: colors.text }]}>{course.title}</Text>
        </View>
        <View style={styles.courseDetails}>
          <Text style={[styles.label, { color: colors.text }]}>{t('Enroll.teacherNameLabel')}</Text>
          <Text style={[styles.value, { color: colors.text }]}>{course.instructor}</Text>
        </View>
        <View style={styles.courseDetails}>
          <Text style={[styles.label, { color: colors.text }]}>{t('Enroll.priceLabel')}</Text>
          <Text style={[styles.value, { color: colors.text }]}>{course.price}</Text>
        </View>

        {/* Enroll Now Button */}
        <TouchableOpacity style={[styles.enrollButton, { backgroundColor: colors.primary }]} onPress={handleEnroll}>
          <Text style={styles.buttonText}>{t('Enroll.continueButton', { price: course.price })}</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  promoCodeContainer: {
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 10,
  },
  input: {
    width: 350,
    height: 48,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 150, 
    borderRadius: 18.92, 
    borderColor: '#CDCDCD',
    borderWidth: 1,
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
    marginTop: 5,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
     
  },
});

export default CourseEnroll;
