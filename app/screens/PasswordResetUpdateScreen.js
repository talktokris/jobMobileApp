import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";

import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  confirm_code: Yup.string()
    .required()
    .min(6)
    .max(6)
    .label("Confirmation Code"),
  password: Yup.string().required().min(6).max(25).label("Password"),

  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

function PasswordResetUpdateScreen({ route, navigation }) {
  const email = route.params.email;
  const message = route.params.message;

  // const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState(message);
  const [eStatus, setEstatus] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (userInfo) => {
    // console.log(userInfo);
    setLoading(true);
    const result = await userUpdate.passwordResetSave(userInfo, email);

    setLoading(false);
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
      navigation.navigate(routes.RETSET_DONE, { message: messageSend });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ActivityIndicator visible={isLoading} />
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.image}
        />

        <ErrorMessage error={error} visible={eStatus} />
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />
        <AppForm
          initialValues={{
            confirm_code: "",
            password: "",
            password_confirmation: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="confirm_code"
            autoCapitalize="characters"
            autoCorrect={false}
            icon="qrcode"
            placeholder="Confirmation Code"
          />

          <AppFormField
            name="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Password"
            textContentType="New Password"
            secureTextEntry={true}
          />
          <AppFormField
            name="password_confirmation"
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Confirm Password"
            textContentType="password"
            secureTextEntry={true}
          />

          <SubmitButton title="Login" />
        </AppForm>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 90,
    height: 80,
    alignSelf: "center",
    margin: 30,
    marginTop: 40,
  },
  error: {
    marginBottom: 30,
  },
});

export default PasswordResetUpdateScreen;
