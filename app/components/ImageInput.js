import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requstPermission();
  }, []);
  const granted = (requstPermission = async () => {
    const granted = ImagePicker.requestCameraPermissionsAsync();
    if (!granted)
      alert("You need to enable permission to access the library s");
  });

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this Image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error reading the image" + error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={40}
            color={colors.medium}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    justifyContent: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
    margin: 5,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
