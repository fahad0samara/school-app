import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import AppIcon from '../../utils/AppIcon';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const courses = [
  { 
    id: '1', 
    title: 'Calculus 1 (Math 131)', 
    instructor: 'Muhammad Yashri', 
    progress: 0.4,
    lessons: 12, 
    imageUri: 'https://cdn.pixabay.com/photo/2017/08/14/11/49/mathematics-2640219_1280.jpg',
    description: 'Learn the fundamental concepts of calculus, including limits, derivatives, and integrals.',
    price: '45 K.D'
  },
  { 
    id: '2', 
    title: 'Physics 1', 
    instructor: 'Fahad', 
    progress: 0.6, 
    lessons: 15, 
    imageUri: 'https://media.istockphoto.com/id/1866121335/tr/foto%C4%9Fraf/physics-and-mathematics.jpg?s=1024x1024&w=is&k=20&c=kmvnzAKvujn2OMlfhfwhrqFI_ymMGqN-lDqYcpYniKM=',
    description: 'An introduction to the principles of physics, covering topics like motion, energy, and waves.',
    price: '50 K.D'
  }
];

const Card = ({ course, navigation }) => {
  const { colors, isDarkMode } = useDarkMode();
  const { t } = useTranslation(); // Initialize useTranslation

  const handlePress = () => {
    navigation.navigate('CourseDetails', { course });
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]} onPress={handlePress}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: course.imageUri }} style={styles.thumbnail} />
        <View style={styles.detailsContainer}>
          <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
          <Text style={[styles.instructorName, { color: colors.text }]}>{course.instructor}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.Progress1}>
          <Text style={[styles.progressLabel, { color: isDarkMode ? '#aaa' : '#333' }]}>{t('lessonProgress')}</Text>
          <Text style={[styles.progressText, { color: '#FE8A54' }]}>{`${course.progress * 100}%`}</Text>
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
      <View style={styles.lessonInfoContainer}>
        <View style={styles.lessonInfoContainer}>
          <AppIcon 
            name="film" 
            size={24} 
            color="#FE8A54"
            style={styles.playCircle} 
            iconSet="Ionicons"
          />
          <Text style={[styles.lessonCount, { color: colors.text }]}>{`${course.lessons} ${t('lessons')}`}</Text>
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

const CourseCard = ({ navigation }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
      {courses.map(course => (
        <Card key={course.id} course={course} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 10,
  },
  card: {
    width: 305.28, 
    height: 190, 
    borderRadius: 16.5, 
    marginRight: 10,
    padding: 15,
    shadowColor: '#698296',
    shadowOffset: { width: 2.06, height: 7.22 },
    shadowOpacity: 0.14,
    shadowRadius: 16.5,
    elevation: 10,
    flexDirection: 'column', 
  },
  headerContainer: {
    flexDirection: 'row', 
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
    justifyContent: 'center', 
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructorName: {
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: 10,
    width: '100%', 
  },
  progressLabel: {
    fontSize: 14,
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
  Progress1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 14,
  },
  lessonInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonCount: {
    fontSize: 15,
    marginLeft: 3,
  },
  playCircle: {
    

  },
});
