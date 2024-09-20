import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';

const courses = [
  { id: '1', title: 'Calculus 1 (Math 131)', teacher: 'Muhammad Yashri', progress: '8/12 Lessons' },
  { id: '2', title: 'Math (132)', teacher: 'Muhammad Yashri', progress: '8/16 Lessons' },
  { id: '3', title: 'Calculus 2 (Math 111)', teacher: 'Muhammad Yashri', progress: '6/10 Lessons' },
  { id: '4', title: 'English (107)', teacher: 'Muhammad Yashri', progress: 'Complete' }
];

const MyCoursesTab = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Filter courses based on the active tab
  const getFilteredCourses = () => {
    if (activeTab === 'Ongoing') {
      return courses.filter(course => course.progress !== 'Complete');
    } else if (activeTab === 'Complete') {
      return courses.filter(course => course.progress === 'Complete');
    }
    return courses;
  };

  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseInfo}>{item.teacher}</Text>
      <Text style={styles.courseInfo}>{item.progress}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'All' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={activeTab === 'All' ? styles.activeText : styles.inactiveText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Ongoing' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Ongoing')}
        >
          <Text style={activeTab === 'Ongoing' ? styles.activeText : styles.inactiveText}>Ongoing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Complete' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Complete')}
        >
          <Text style={activeTab === 'Complete' ? styles.activeText : styles.inactiveText}>Complete</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredCourses()}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#87ceeb',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#000',
  },
  courseList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  courseCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  courseInfo: {
    color: '#555',
  },
});

export default MyCoursesTab;
