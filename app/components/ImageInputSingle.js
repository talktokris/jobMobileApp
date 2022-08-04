import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ImageInputSingle({
  name,
  imageUri,
  onChangeImage,
  imageStatus,
  imagePath,
}) {
  const [imageUriLink, setImageUriLink] = useState(imagePath);
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [uri]);
  };

  useEffect(() => {
    requstPermission();
  }, []);
  const granted = (requstPermission = async () => {
    const granted = ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  });

  const handlePress = () => {
    selectImage();
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      // if (!result.cancelled) onChangeImage(result.uri);
      if (!result.cancelled) {
        //  console.log(result);
        setImageUriLink(result.uri);
        handleAdd(result);
      }
    } catch (error) {
      console.log("Error reading the image" + error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {imageStatus == null ? (
          <Image
            style={styles.image}
            source={require("../assets/images/av.png")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: imageUriLink }} />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.uploadBtn}>
              {!imageUri && (
                <MaterialCommunityIcons
                  name="camera"
                  size={40}
                  color={colors.white}
                />
              )}
              {/*  {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
              )}
            */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  buttonContainer: { justifyContent: "center", alignItems: "center", top: -50 },
  uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 2,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.white,
  },
  image: {
    width: 250,
    height: 210,
    alignSelf: "center",
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 1,
  },
});

export default ImageInputSingle;
