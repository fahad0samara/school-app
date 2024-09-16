import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Define a type for the image picker result
type ImagePickerResult = {
  uri: string,
};

// Function to launch the image picker and return the selected image URI
export const launchImagePicker = async (): Promise<string | undefined> => {
  try {
    await checkMediaPermissions();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    } else {
      // Handle the case when no image is selected
      return undefined;
    }
  } catch (error) {
    // Handle and log errors (could be permission errors or other issues)
    console.error("Error picking image:", error);
    return undefined;
  }
};

// Function to check media permissions and request if not granted
const checkMediaPermissions = async (): Promise<void> => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      throw new Error("We need permission to access your photos");
    }
  }
};
