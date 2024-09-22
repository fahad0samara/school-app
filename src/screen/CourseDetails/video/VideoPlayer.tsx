import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ResizeMode, Video } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

type VideoScreenParams = {
  videoUrl: string;
  videoPosition: number;
};

const VideoSection = ({ videoUrl }: { videoUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPosition, setVideoPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<Video | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        videoRef.current.getStatusAsync().then(status => {
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
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = async () => {
    if (videoRef.current) {
      await videoRef.current.replayAsync();
      setIsPlaying(true);
    }
  };

  const handleFullscreen = () => {
    // Pause the video before entering full-screen
    if (isPlaying) {
      videoRef.current?.pauseAsync();
    }
    navigation.navigate('VideoScreen', { videoUrl, videoPosition } as VideoScreenParams); // pass the current position
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: videoUrl }}
        useNativeControls={false}
        isLooping={false}
        shouldPlay={isPlaying}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded) {
            setVideoDuration(status.durationMillis);
            setVideoPosition(status.positionMillis);
          }
        }}
        resizeMode={ResizeMode.CONTAIN}
      />
      <View style={styles.controlsOverlay}>
        <TouchableOpacity onPress={togglePlayback} style={styles.controlButton}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.timeText}>
          {Math.floor(videoPosition / 1000)} / {Math.floor(videoDuration / 1000)} sec
        </Text>
        <TouchableOpacity onPress={handleReplay} style={styles.controlButton}>
          <Ionicons name="reload" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFullscreen} style={styles.controlButton}>
          <Ionicons name="expand-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    position: "relative",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
  controlsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparent background for overlay
  },
  controlButton: {
    padding: 10,
  },
  timeText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default VideoSection;