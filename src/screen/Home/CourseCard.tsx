import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

import AppIcon from '../../utils/AppIcon';

const courses = [
  { id: '1', title: 'Calculus 1 (Math 131)', instructor: 'Muhammad Yashri', progress: 0.4, lessons: 12, imageUri: 'https://cdn.pixabay.com/photo/2017/08/14/11/49/mathematics-2640219_1280.jpg' },
  { id: '2', title: 'Physics 1', instructor: 'John Doe', progress: 0.6, lessons: 15, imageUri: 'https://media.istockphoto.com/id/1866121335/tr/foto%C4%9Fraf/physics-and-mathematics.jpg?s=1024x1024&w=is&k=20&c=kmvnzAKvujn2OMlfhfwhrqFI_ymMGqN-lDqYcpYniKM=' },
  // Add more courses here
];

const CourseCard = ({ course }) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Course Thumbnail and Details */}
      <View style={styles.headerContainer}>
        <Image source={{ uri: course.imageUri }} style={styles.thumbnail} />

        <View style={styles.detailsContainer}>
          {/* Course Title and Instructor */}
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.instructorName}>{course.instructor}</Text>
        </View>
      </View>

      {/* Lesson Progress (takes full width, below image and title) */}
      <View style={styles.progressContainer}>
      <View
      style={styles.Progress1}
      >
          <Text style={styles.progressLabel}>Lesson Progress</Text>
         <Text style={styles.progressText}>{`${course.progress * 100}%`}</Text>
      </View>
        <View style={styles.progressBarContainer}>
          <Progress.Bar 
            progress={course.progress} 
            width={null} 
            color="#3498db"
            height={10}
            borderRadius={5}
            style={styles.progressBar} 
          />
         
        </View>
      </View>

      {/* Lesson Count */}
      <View style={styles.lessonInfoContainer}>
       <View style={styles.lessonInfoContainer}>
        <AppIcon 
          name="film" 
          size={24} 
          color="#FE8A54"
          style={styles.playCircle} 
           iconSet="Ionicons"
        />
        <Text style={styles.lessonCount}>{`${course.lessons} Lessons`}</Text>
      </View>
              <AppIcon
          name="play-circle"
          size={35}
          color="#3498db"
          style={styles.playCircle}
          iconSet="FontAwesome" 
        />
      
      </View>
    </TouchableOpacity>
  );
};

const CourseList = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ScrollView>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 10,
  },
  card: {
    width: 305.28, 
    height: 190, 
    borderRadius: 16.5, 
    backgroundColor: '#fff',
    marginRight: 10,
    padding: 15,
    shadowColor: '#698296',
    shadowOffset: { width: 2.06, height: 7.22 },
    shadowOpacity: 0.14,
    shadowRadius: 16.5,
    elevation: 10,
    flexDirection: 'column', // Use column to stack items vertically
  },
  headerContainer: {
    flexDirection: 'row', // Align the image and details horizontally
    marginBottom: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
     borderRadius: 15,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center', // Vertically align title and instructor
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  instructorName: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 10,
    width: '100%', // Take the full width of the card
  },
  progressLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    marginRight: 10, 
  },
  Progress1:{
  flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 14,
    color: '#FE8A54',
  },
  lessonInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },

  lessonCount: {
    fontSize: 15,
    color: '#333',
    marginLeft:3
    
  },
  playCircle: {
 
  },
});
