import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";
import settings from "../config/settings";
import colors from "../config/colors";
import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  images: Yup.mixed().nullable().required("Required Field"),
  /*
  images: Yup.mixed()
    .test("fileType", "Unsupported File Format", function (value) {
      const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 800000; //0.5MB
      return value.size <= sizeInBytes;
    }),
    */
});

const categoriesList = [
  { lebel: "Furniture", value: 1, backgroundColor: "red", icon: "apps" },
  { lebel: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
  { lebel: "Electronics", value: 3, backgroundColor: "purple", icon: "lock" },
  { lebel: "Camera", value: 4, backgroundColor: "orange", icon: "apps" },
];

function ResumeUplaodScreen({ route, navigation, props }) {
  const users = route.params.item;
  //console.log(users.image);
  const currrentUser = users.id;
  const imagePath =
    settings.imageUrl + "members/" + users.id + "/" + users.image;
  // console.log(imagePath);
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (userInfo) => {
    const result = await userUpdate.imagesUpload(userInfo, currrentUser);
    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.status != "success") {
      setEstatus(true);
      setError(result.data.message);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };
  /*
  const handleSubmit = async (listing, { resetForm }) => {
    listingsApi.addListing(listing);
    console.log(listing);

    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }
    // resetForm();
  };
*/
  return (
    <Screen>
      <View style={styles.container}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        {/*
        {users.image == null ? (
          <Image
            style={styles.image}
            source={require("../assets/images/av.png")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: imagePath }} />
        )}
        */}
        <AppForm
          initialValues={{
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.uploadBtn}>
            <AppFormImagePicker
              name="images"
              imageStatus={users.image}
              imagePath={imagePath}
            />
            <SubmitButton title="Upload" />
          </View>
        </AppForm>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

export default ResumeUplaodScreen;
