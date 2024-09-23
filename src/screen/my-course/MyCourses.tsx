import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import AppIcon from "../../utils/AppIcon";
import { useDarkMode } from "../../Hooks/darkmode/useDarkMode";
const screenWidth = Dimensions.get("window").width;
// Example course data with images
const courses = [
  {
    id: "1",
    title: "Calculus 1 (Math 131)",
    teacher: "Muhammad Yashri",
    progress: "8/12 Lessons",
    image:
      "https://media.istockphoto.com/id/1001830272/tr/foto%C4%9Fraf/apple-%C5%9Fekilde-kitap-ve-soru-i%C5%9Fareti.jpg?s=1024x1024&w=is&k=20&c=6KcpdWeg8y5dsgetfHurgJKMhtt7_EhgYXHyitw8rGI=",
    status: "ongoing",
  },
  {
    id: "2",
    title: "Math (132)",
    teacher: "Muhammad Yashri",
    progress: "8/16 Lessons",
    image:
      "https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "ongoing",
  },
  {
    id: "3",
    title: "Calculus 2 (Math 111)",
    teacher: "Muhammad Yashri",
    progress: "6/10 Lessons",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "ongoing",
  },
  {
    id: "4",
    title: "English (107)",
    teacher: "Muhammad Yashri",
    progress: "Complete",
    image:
      "https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "complete",
  },
];

const MyCoursesTab = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { colors, isDarkMode } = useDarkMode();
  // Filter courses based on the active tab
  const getFilteredCourses = () => {
    if (activeTab === "Ongoing") {
      return courses.filter((course) => course.status === "ongoing");
    } else if (activeTab === "Complete") {
      return courses.filter((course) => course.status === "complete");
    }
    return courses;
  };

  const renderCourse = ({ item }) => (
      <View style={[styles.courseCard, { backgroundColor: colors.card }]}>
      {/* Course Image */}
      <Image source={{ uri: item.image }} style={styles.courseImage} />

      {/* Course Details */}
      <View style={styles.courseDetails}>
       <Text style={[styles.courseTitle, { color: colors.text }]}>{item.title}</Text>
       <Text style={[styles.courseInfo, { color: colors.text }]}>{item.teacher}</Text>
        <View style={styles.lessonInfoContainer}>
          <View style={styles.lessonInfoContainer}>
            <AppIcon
              name="film"
              size={24}
              color="#FE8A54"
              style={styles.playCircle}
              iconSet="Ionicons"
            />
          <Text style={[styles.lessonCount, { color: colors.text }]}>{item.progress}</Text>
          </View>
          {/* Course Status or Play Button */}
          <View style={styles.courseStatus}>
            {item.status === "complete" ? (
              <Text style={styles.completeText}>Complete</Text>
            ) : (
              <AppIcon
                name="play-circle"
                size={40}
                color="#3498db"
                style={styles.playCircle}
                iconSet="FontAwesome"
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
  <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={{ color: colors.text, fontSize: 20, marginTop: 10,
        textAlign:"center"

         }}>
          {activeTab}
        </Text>
        {/* Tab Bar */}
        <View style={styles.tabBar}>
          
          {["All", "Ongoing", "Complete"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={
                  activeTab === tab ? styles.activeText : styles.inactiveText
                }
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Course List */}
        <FlatList
          data={getFilteredCourses()}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.courseList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
 
    
  },
  container: {
    flex: 1,

    
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, 
  },
  lessonInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  lessonCount: {
    fontSize: 15,
    color: "#333",
    marginLeft: 3,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#7AA2BD54",
    borderRadius: 15,
   marginHorizontal:20,
    padding: 4,
    justifyContent: "space-around",
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "#000",
  },
  courseList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  courseCard: {
    width: screenWidth * 0.93, // Adjust width based on screen size for responsiveness

    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  courseImage: {
    width: 96,
    height: 85,
    borderRadius: 10,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  courseInfo: {
    color: "#555",
  },
  playCircle: {},
  courseStatus: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  completeText: {
    color: "green",
    fontWeight: "bold",
  },
});

export default MyCoursesTab;
