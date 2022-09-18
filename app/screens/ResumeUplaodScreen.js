import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { AppForm, ErrorMessage, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import UploadScreen from "./UploadScreen";
import settings from "../config/setting";
import colors from "../config/colors";
import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
const validationSchema = Yup.object().shape({
  images: Yup.array().min(
    1,
    "Please select image ( Images should be jpg or png and less then 5 MB in size)"
  ),
});

function ResumeUplaodScreen({ route, navigation, props }) {
  const users = route.params.item;
  const currrentUser = users.id;
  const imagePath =
    settings.imageUrl + "members/" + users.id + "/" + users.image;
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (userInfo) => {
    setLoading(true);
    const result = await userUpdate.imagesUpload(userInfo, currrentUser);
    setLoading(false);
    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.status != "success") {
      setEstatus(true);
      setErrorMsg(result.data.message);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else if (result.data.error.image_name) {
      setEstatus(true);
      setErrorMsg(result.data.error.image_name);
    } else {
      setEstatus(true);
      setErrorMsg("Unknown error");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ActivityIndicator visible={isLoading} />
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <ErrorMessage error={errorMsg} visible={eStatus} />

        <AppForm
          initialValues={{
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppText style={styles.note}>
            Images should be jpg or png and less then 5 MB in size
          </AppText>
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
  note: {
    padding: 10,
    fontSize: 14.5,
    color: colors.medium,
  },
});

export default ResumeUplaodScreen;
