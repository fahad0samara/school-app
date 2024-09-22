import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from 'expo-screen-orientation';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute, useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const VideoScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPosition, setVideoPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false); // Mute state
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const videoRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { videoUrl, videoPosition: initialPosition } = route.params;

  useEffect(() => {
    if (videoRef.current && initialPosition) {
      videoRef.current.playFromPositionAsync(initialPosition).then(() => {
        setIsPlaying(true);
      });
    }
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, [initialPosition]);

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

  const handleBack = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    navigation.goBack();
  };

  const changePlaybackSpeed = async (speed) => {
    if (videoRef.current) {
      await videoRef.current.setRateAsync(speed, true);
      setPlaybackSpeed(speed);
      setOptionsVisible(false); // Close options after selection
    }
  };

  const handleSeek = async (value) => {
    if (videoRef.current) {
      const newPosition = value * videoDuration;
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  const toggleFullScreen = async () => {
    if (isFullScreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    setIsFullScreen(!isFullScreen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 1 : 0); // Toggle volume between 1 and 0
    if (videoRef.current) {
      videoRef.current.setVolumeAsync(isMuted ? 1 : 0);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const handlePress = () => {
    setControlsVisible(!controlsVisible);
  };

  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Video
        ref={videoRef}
        style={isFullScreen ? styles.fullScreenVideo : styles.video}
        source={{ uri: videoUrl }}
        useNativeControls={false}
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded) {
            setVideoDuration(status.durationMillis);
            setVideoPosition(status.positionMillis);
          }
        }}
        resizeMode={ResizeMode.CONTAIN}
        volume={volume}
      />
      {controlsVisible && (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={60} color="#fff" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{formatTime(videoPosition)} / {formatTime(videoDuration)}</Text>
            <Slider
              style={styles.seekBar}
              minimumValue={0}
              maximumValue={1}
              value={videoDuration ? videoPosition / videoDuration : 0}
              onValueChange={handleSeek}
              thumbTintColor="#fff"
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#fff"
            />
          </View>
          <View style={styles.controlButtons}>
            <TouchableOpacity onPress={toggleMute} style={styles.muteButton}>
              <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleOptions} style={styles.optionsButton}>
              <Ionicons name="options-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFullScreen} style={styles.fullScreenButton}>
              <Ionicons name={isFullScreen ? "contract" : "expand"} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {optionsVisible && (
        <View style={styles.optionsOverlay}>
          <TouchableOpacity onPress={() => changePlaybackSpeed(0.5)}>
            <Text style={styles.optionText}>0.5x Speed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changePlaybackSpeed(1)}>
            <Text style={styles.optionText}>Normal Speed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changePlaybackSpeed(1.5)}>
            <Text style={styles.optionText}>1.5x Speed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changePlaybackSpeed(2)}>
            <Text style={styles.optionText}>2x Speed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOptions} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: "100%",
    height: "50%",
  },
  fullScreenVideo: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'transparent',
  },
  playButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  progressContainer: {
    alignItems: "flex-end",
  },
  progressText: {
    fontSize: 14,
    color: "#fff",
    marginRight: 10,
  },
  seekBar: {
    width: "100%",
    height: 40,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10,
  },
  fullScreenButton: {
    padding: 10,
  },
  optionsButton: {
    padding: 10,
  },
  muteButton: {
    padding: 10,
  },
  optionsOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    padding: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VideoScreen;
