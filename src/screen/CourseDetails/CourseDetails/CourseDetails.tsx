import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";

import Slider from '@react-native-community/slider';

import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoSection from "../video/VideoPlayer";

const CourseDetails = ({ navigation }) => {
  const route = useRoute();
  const { course } = route.params; // Get course data from navigation params

  const [expandedWeek1, setExpandedWeek1] = useState(false);
  const [expandedWeek2, setExpandedWeek2] = useState(false);
  const [expandedWeek3, setExpandedWeek3] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPosition, setVideoPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('720p');

  const video = React.useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (video.current) {
        video.current.getStatusAsync().then(status => {
          if (status.isLoaded) {
            setVideoPosition(status.positionMillis);
            setVideoDuration(status.durationMillis);
          }
        });
      }
    };

    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = async () => {
    if (video.current) {
      if (isPlaying) {
        await video.current.pauseAsync();
      } else {
        await video.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const replayVideo = async () => {
    if (video.current) {
      await video.current.setPositionAsync(0);
      await video.current.playAsync();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSeek = async (value) => {
    if (video.current) {
      const newPosition = value * videoDuration;
      await video.current.setPositionAsync(newPosition);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
       <SafeAreaView style={styles.safeArea}>
 <ScrollView style={styles.container}>
      {/* Header */}
   <View style={styles.header}>
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={27} color="#000" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Course Details</Text>
</View>

      {/* Video Section */}


        <VideoSection videoUrl="https://www.w3schools.com/html/mov_bbb.mp4" />






      {/* Options Modal */}
      <Modal transparent={true} visible={showOptions} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Video Options</Text>
            <Text>Volume: {(volume * 100).toFixed(0)}%</Text>
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={setVolume}
            />
            <Text>Playback Speed:</Text>
            <View style={styles.speedOptions}>
              {[0.5, 1.0, 1.5, 2.0].map(speed => (
                <TouchableOpacity
                  key={speed}
                  style={[styles.speedButton, playbackSpeed === speed && styles.selectedButton]}
                  onPress={() => setPlaybackSpeed(speed)}
                >
                  <Text style={styles.speedText}>{speed}x</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text>Quality:</Text>
            <View style={styles.qualityOptions}>
              {['720p', '1080p'].map(quality => (
                <TouchableOpacity
                  key={quality}
                  style={[styles.qualityButton, selectedQuality === quality && styles.selectedButton]}
                  onPress={() => setSelectedQuality(quality)}
                >
                  <Text style={styles.qualityText}>{quality}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={toggleOptions} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Course Info */}
      <View style={styles.courseInfo}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{course.title}</Text> 
          <Text style={styles.coursePrice}>{course.price} K.D</Text> 
        </View>
        <Text style={styles.teacher}>Teacher: {course.instructor}</Text> 
        <Text style={styles.description}>{course.description}</Text> 
      </View>

      {/* Lessons Section */}
      <View style={styles.lessonsSection}>
        <Text style={styles.sectionTitle}>Lessons</Text>

        {/* Week 1 */}
        <TouchableOpacity onPress={() => setExpandedWeek1(!expandedWeek1)} style={styles.lessonHeader}>
          <View style={styles.lessonInfo}>
            <Ionicons name="play-circle" size={24} color="#3498db" />
            <Text style={styles.weekTitle}>Week 1</Text>
          </View>
          <Ionicons name={expandedWeek1 ? "chevron-up" : "chevron-down"} size={24} />
        </TouchableOpacity>
        {expandedWeek1 && (
          <View style={styles.lessonDetails}>
            <View style={styles.lessonItem}>
              <Ionicons name="document-text-outline" size={24} color="#3498db" />
              <Text style={styles.lessonText}>Introduction (2 Videos, 2 Documents)</Text>
            </View>
            <View style={styles.lessonMeta}>
              <Text style={styles.lessonDuration}>22:30 min</Text>
              <Text style={styles.downloadButton}>Download Materials</Text>
            </View>
          </View>
        )}

        {/* Week 2 */}
        <TouchableOpacity onPress={() => setExpandedWeek2(!expandedWeek2)} style={styles.lessonHeader}>
          <View style={styles.lessonInfo}>
            <Ionicons name="play-circle" size={24} color="#3498db" />
            <Text style={styles.weekTitle}>Week 2</Text>
          </View>
          <Ionicons name={expandedWeek2 ? "chevron-up" : "chevron-down"} size={24} />
        </TouchableOpacity>
        {expandedWeek2 && (
          <View style={styles.lessonDetails}>
            <View style={styles.lessonItem}>
              <Ionicons name="document-text-outline" size={24} color="#3498db" />
              <Text style={styles.lessonText}>Limits and Continuity (3 Videos, 3 Documents)</Text>
            </View>
            <View style={styles.lessonMeta}>
              <Text style={styles.lessonDuration}>30:00 min</Text>
              <Text style={styles.downloadButton}>Download Materials</Text>
            </View>
          </View>
        )}

        {/* Week 3 */}
        <TouchableOpacity onPress={() => setExpandedWeek3(!expandedWeek3)} style={styles.lessonHeader}>
          <View style={styles.lessonInfo}>
            <Ionicons name="play-circle" size={24} color="#3498db" />
            <Text style={styles.weekTitle}>Week 3</Text>
          </View>
          <Ionicons name={expandedWeek3 ? "chevron-up" : "chevron-down"} size={24} />
        </TouchableOpacity>
        {expandedWeek3 && (
          <View style={styles.lessonDetails}>
            <View style={styles.lessonItem}>
              <Ionicons name="document-text-outline" size={24} color="#3498db" />
              <Text style={styles.lessonText}>Derivatives (2 Videos, 1 Document)</Text>
            </View>
            <View style={styles.lessonMeta}>
              <Text style={styles.lessonDuration}>25:00 min</Text>
              <Text style={styles.downloadButton}>Download Materials</Text>
            </View>
          </View>
        )}
      </View>

      {/* Enroll Button */}
      <TouchableOpacity style={styles.enrollButton}>
        <Text style={styles.enrollText}>Enroll Now</Text>
      </TouchableOpacity>
    </ScrollView>
       </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },

  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Background color for the header
    padding: 10, // Padding around the header
    elevation: 5, // Add shadow on Android
    shadowColor: '#000', 
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
    paddingHorizontal:20
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1, 
    textAlign: 'center', 
  },
  backButton: {
    backgroundColor: '#e0e0e0',
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
    color: "#666",
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
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  lessonDetails: {
    paddingVertical: 10,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  lessonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
  },
  lessonMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonDuration: {
    fontSize: 14,
    color: "#666",
  },
  downloadButton: {
    fontSize: 14,
    color: "#3498db",
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
