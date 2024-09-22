import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// Get screen width for responsive card sizing
const screenWidth = Dimensions.get('window').width;
import { Shadow } from 'react-native-shadow-2';

const courses = [
  {
    id: 1,
    title: 'Calculus 1',
    subtitle: 'MAT 131',
    instructor: 'أ. محمد يسري', // Arabic instructor name
    imageUrl: 'https://media.istockphoto.com/id/1017116892/tr/foto%C4%9Fraf/molek%C3%BCler-yap%C4%B1s%C4%B1.jpg?s=1024x1024&w=is&k=20&c=r0GmJ5fIZBULslZLpChshPDB1bJmgJtSxMx0_dwDgWw=', // Replace with the actual image URL
    description: 'Learn the fundamental concepts of calculus, including limits, derivatives, and integrals.',
    price: '45 K.D',
  },
  {
    id: 2,
    title: 'English 107',
    subtitle: 'ENG 107',
    instructor: 'Dr. fahad ',
    imageUrl: 'https://media.istockphoto.com/id/490642112/tr/foto%C4%9Fraf/back-to-school-theme-on-chalkboard.jpg?s=1024x1024&w=is&k=20&c=dUJEOJrZnICvDEKjZJchgdJ2EdX8bkLOMmtdHMqMNtE=', // Replace with the actual image URL
    description: 'An introduction to English literature and composition, enhancing writing and analytical skills.',
    price: '50 K.D',
  },
  {
    id: 3,
    title: 'Physics 1',
    subtitle: 'PHY 101',
    instructor: 'Eng. fahad',
    imageUrl: 'https://media.istockphoto.com/id/1369120765/tr/foto%C4%9Fraf/creative-scientific-formula-illustration-with-man-hand-writing-in-diary-on-background.jpg?s=612x612&w=0&k=20&c=xdh9XtM6ej9NEVzEsu4lxuLCSmqIC1DxGfrbnYxjx4E=',
    description: 'An introductory course covering the basics of classical mechanics and thermodynamics.',
    price: '55 K.D',
  },
  {
    id: 4,
    title: 'Introduction to Programming',
    subtitle: 'CS 101',
    instructor: 'Prof. ssamara',
    imageUrl: 'https://media.istockphoto.com/id/465367515/tr/vekt%C3%B6r/business-infographic-with-open-book-learning-style.jpg?s=612x612&w=0&k=20&c=7HPgBAG8hd8YTaELUYciLJTDETKMGGUEIwL7upnx78w=',
    description: 'Learn the basics of programming using Python, covering fundamental concepts and problem-solving techniques.',
    price: '60 K.D',
  },
  {
    id: 5,
    title: 'Biology 101',
    subtitle: 'BIO 101',
    instructor: 'Dr. Sarah ',
    imageUrl: 'https://media.istockphoto.com/id/1454829388/tr/foto%C4%9Fraf/businessman-using-mobile-smart-phone-business-global-internet-connection-application.jpg?s=612x612&w=0&k=20&c=L0Esvw48rUuD_OrDUQRHkrSVnA6o4cEhpX0oB3-8Ijo=',
    description: 'Explore the fundamentals of biology, including cell structure, genetics, and evolution.',
    price: '50 K.D',
  },
  // Add more courses as needed
];


const CourseList = () => {
    const navigation = useNavigation();
  const handleCoursePress = (course) => {
  console.log('Navigating to CourseDetails with course:', course);
  navigation.navigate('CourseDetails', { course });
};

    return (
     <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      {courses.map((course) => (
  <TouchableOpacity 
  key={course.id} 
  style={styles.courseContainer} 
  onPress={() => handleCoursePress(course)
  }
>

          <Image
            source={{ uri: course.imageUrl }}
            style={styles.image}
          />
          
          <View style={styles.textContainer}>
            <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.instructor}>{course.instructor}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {

    marginBottom: 40,
  },
  contentContainer: {
        paddingVertical: 5,
  },
  courseContainer: {
    width: screenWidth * 0.6, // Adjust width based on screen size for responsiveness
   
    borderRadius: 15,
    marginRight: 15,
    
   backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 11, // Match the requested padding
 
     shadowColor: '#698296',
    shadowOffset: {
      width: 1, // Mimicking the box-shadow's x-offset
      height: 3, // Mimicking the box-shadow's y-offset
    },
    shadowOpacity: 0.1, // Corresponds to lighter shadow opacity (0D, 0A, etc.)
    shadowRadius: 6, // Matches the spread radius
    elevation: 5, // For Android shadow
  },
  image: {
    width: '100%',
    height: 100, // Set fixed height for the image
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  instructor: {
    fontSize: 14,
    color: '#888',
  },
});

export default CourseList;

