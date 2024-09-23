import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoSection from "../video/VideoPlayer";
import CourseEnroll from "../../BuyCourse/CourseEnroll";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../../Hooks/darkmode/useDarkMode";

const CourseDetails = ({ navigation }) => {
  const { t } = useTranslation();
  const route = useRoute();
  const { course } = route.params; // Get course data from navigation params
  const enrollSheetRef = useRef(null);
  const [expandedWeek1, setExpandedWeek1] = useState(false);
  const [expandedWeek2, setExpandedWeek2] = useState(false);
  const [expandedWeek3, setExpandedWeek3] = useState(false);
 const { colors, isDarkMode } = useDarkMode(); 
  // State for toggling lesson 2 expansion within week 3
  const [expandedLesson2, setExpandedLesson2] = useState(false);

  return (
     <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={[styles.header,{ backgroundColor: colors.background2 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={27} color="#FE8A54" />
          </TouchableOpacity>
        <Text style={[styles.weekTitle, { color: colors.text }]}>
            {t("CourseDetails.headerTitle")}
          </Text>
        </View>

        {/* Video Section */}
        <VideoSection videoUrl="https://www.w3schools.com/html/mov_bbb.mp4" />
        {/* Course Info */}
        <View style={[styles.courseInfo,{ backgroundColor: colors.background2 }]}>
          <View style={styles.courseHeader}>
                       <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
                        <Text style={[styles.coursePrice, { color: colors.primary }]}>{course.price}</Text>
          </View>
          <Text style={[styles.teacher, { color: colors.text }]}>
            {t("CourseDetails.teacher")} {course.instructor}
          </Text>
                   <Text style={[styles.description, { color: colors.text }]}>{course.description}</Text>
        </View>

        {/* Lessons Section */}
        <View style={styles.lessonsSection}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
                 <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("CourseDetails.lessons")}
            </Text>
            <Text style={styles.sectionweeks}>{t("CourseDetails.weeks")}</Text>
          </View>

          {/* Week 1 */}
          <TouchableOpacity
            onPress={() => setExpandedWeek1(!expandedWeek1)}
             style={[styles.lessonHeader, { backgroundColor: colors.card }]}
          >
            <View style={styles.lessonInfo}>
              <Ionicons name="play-circle" size={24} color="#3498db" />
              <Text style={[styles.weekTitle, { color: colors.text }]}>{t("CourseDetails.week1")}</Text>
              <View style={styles.weekTag}>
                <Text style={styles.freeTag}>
                  {t("CourseDetails.week1Free")}
                </Text>
              </View>
            </View>
            <Ionicons
              name={expandedWeek1 ? "chevron-up" : "chevron-down"}
              size={24}
              color={"#FE8A54"}
            />
          </TouchableOpacity>

          {expandedWeek1 && (
            <View style={styles.lessonDetails}>
              <View style={styles.lessonItem}>
                <Ionicons name="videocam-outline" size={20} color="#e67e22" />
                <Text style={styles.lessonText}>
                  {t("CourseDetails.week1Video")}
                </Text>
              </View>
              <View style={styles.lessonItem}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#e67e22"
                />
                <Text style={styles.lessonText}>
                  {t("CourseDetails.week1Document")}
                </Text>
              </View>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonDuration}>
                  {t("CourseDetails.week1Duration")}
                </Text>
                <Text style={styles.downloadButton}>
                  {t("CourseDetails.downloadMaterials")}
                </Text>
              </View>
            </View>
          )}

          {/* Week 2 */}
          <TouchableOpacity
            onPress={() => setExpandedWeek2(!expandedWeek2)}
           style={[styles.lessonHeader, { backgroundColor: colors.card }]}
          >
            <View style={styles.lessonInfo}>
              <Ionicons name="play-circle" size={24} color="#3498db" />
            <Text style={[styles.weekTitle, { color: colors.text }]}>{t("CourseDetails.week2")}</Text>
            </View>
            <Ionicons
              name={expandedWeek2 ? "chevron-up" : "chevron-down"}
              size={24}
              color={"#FE8A54"}
            />
          </TouchableOpacity>
          {expandedWeek2 && (
            <View style={styles.lessonDetails}>
              <View style={styles.lessonItem}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#3498db"
                />
                <Text style={styles.lessonText}>
                  {t("CourseDetails.week2Content")}
                </Text>
              </View>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonDuration}>
                  {t("CourseDetails.week2Duration")}
                </Text>
                <Text style={styles.downloadButton}>
                  {t("CourseDetails.downloadMaterials")}
                </Text>
              </View>
            </View>
          )}

          {/* Week 3 */}
          <TouchableOpacity
            onPress={() => setExpandedWeek3(!expandedWeek3)}
               style={[styles.lessonHeader, { backgroundColor: colors.card }]}
          >
            <View style={styles.lessonInfo}>
              <View style={styles.iconShadowWrapper}>
                <Ionicons name="play-circle" size={24} color="#3498db" />
              </View>
            <Text style={[styles.weekTitle, { color: colors.text }]}>{t("CourseDetails.week3")}</Text>
              <View style={styles.paidTag}>
                <Text style={styles.paidTagText}>
                  {t("CourseDetails.week3Paid")}
                </Text>
              </View>
            </View>
            <Ionicons
              name={expandedWeek3 ? "chevron-up" : "chevron-down"}
              size={24}
              color={"#FE8A54"}
            />
          </TouchableOpacity>
          {expandedWeek3 && (
            <View style={styles.lessonDetails}>
              <View style={styles.lessonItem}>
                <Ionicons name="videocam-outline" size={20} color="#e67e22" />
                <Text style={styles.lessonText}>
                  {t("CourseDetails.lesson1")}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setExpandedLesson2(!expandedLesson2)}
                style={styles.lessonItem}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#e67e22"
                />
                <Text style={styles.lessonText}>
                  {t("CourseDetails.lesson2")}
                </Text>
                <Ionicons
                  name={expandedLesson2 ? "chevron-up" : "chevron-down"}
                  size={24}
                />
              </TouchableOpacity>

              {expandedLesson2 && (
                <View>
                  <View style={styles.lessonMeta}>
                    <Text style={styles.lessonDuration}>45:30 min</Text>
                    <Text style={styles.downloadButton}>
                      {t("CourseDetails.downloadMaterials")}
                    </Text>
                  </View>
                  <Text style={styles.resourceTitle}>
                    {t("CourseDetails.additionalResources")}
                  </Text>
                  <Text style={styles.resourceItem}>
                    {t("CourseDetails.resource1")}
                  </Text>
                  <Text style={styles.resourceItem}>
                    {t("CourseDetails.resource2")}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Enroll Button */}
        <TouchableOpacity
          onPress={() => enrollSheetRef.current.open()}
          style={styles.enrollButton}
        >
          <Text style={styles.enrollText}>{t("CourseDetails.enrollText")}</Text>
        </TouchableOpacity>

        {/* Render the CourseEnroll component with ref */}
        <CourseEnroll enrollSheetRef={enrollSheetRef} course={course} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  videoContainer: {
    position: "relative",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 200,
  },
  videoFullscreen: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -15,
    marginTop: -15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 10,
  },
  progressContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  seekBar: {
    width: "100%",
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  controlButton: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  controlButtonText: {
    color: "#fff",
  },
  fullscreenControls: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  fullscreenButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  volumeSlider: {
    marginVertical: 15,
  },
  speedOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  speedButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#3498db",
  },
  selectedButton: {
    backgroundColor: "#2980b9",
  },
  speedText: {
    color: "#fff",
  },
  qualityOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  qualityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#3498db",
  },
  qualityText: {
    color: "#fff",
  },
  closeButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
  },
  courseInfo: {
    padding: 20,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  coursePrice: {
    fontSize: 18,
    color: "#FE8A54",
    fontWeight: "bold",
  },
  teacher: {
    marginTop: 5,
    fontSize: 16,

    fontStyle: "italic",
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  lessonsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionweeks: {
    fontSize: 16,
    color: "#FE8A54",
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 18.92,
    width: 358,
    height: 78,
    shadowColor: "#698296",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginVertical: 10,
  },
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconShadowWrapper: {
    shadowColor: "#698296",
    shadowOffset: { width: 0, height: 7.09 },
    shadowOpacity: 0.12,
    shadowRadius: 33.11,
    elevation: 10,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  weekTag: {
    backgroundColor: "#d1f0ff",
    paddingHorizontal: 5,
    marginLeft: 8,
    borderRadius: 4,
  },
  freeTag: {
    fontSize: 12,
    color: "#3498db",
    fontWeight: "600",
  },

  paidTag: {
    backgroundColor: "#ffe6e6",
    paddingHorizontal: 5,
    marginLeft: 8,
    borderRadius: 4,
  },
  paidTagText: {
    fontSize: 12,
    color: "#e74c3c",
    fontWeight: "600",
  },
  lessonDetails: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  lessonText: {
    fontSize: 16,
    color: "#333",
  },
  lessonDuration: {
    fontSize: 14,
    color: "#888",
  },
  lessonResources: {
    marginLeft: 25,
  },
  resourceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  resourceTitle: {
    fontSize: 14,
    color: "#333",
  },
  resourceText: {
    fontSize: 14,
    color: "#333",
  },
  downloadButton: {
    fontSize: 14,
    color: "#3498db",
    textDecorationLine: "underline",
  },
  dropdownText: {
    fontSize: 14,
    color: "#888",
    backgroundColor: "#ececec",
    padding: 4,
    borderRadius: 4,
  },

  lessonMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  enrollButton: {
    backgroundColor: "#3498db",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  enrollText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CourseDetails;
