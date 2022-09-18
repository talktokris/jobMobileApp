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

import AppText from "../components/AppText";
import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function PasswordResetScreen({ navigation }) {
  //  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (userInfo) => {
    setLoading(true);

    const result = await userUpdate.passwordResetTrigger(userInfo);
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
      navigation.navigate(routes.AUTH_PASSWORD_RESET_SAVE, {
        email: userInfo.email,
        message: messageSend,
      });
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
        <AppText style={styles.forgetPassword}>Forgot Password</AppText>
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />

        <ErrorMessage error={error} visible={eStatus} />

        <AppForm
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          />

          <SubmitButton title="Reset Password" />
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
    margin: 20,
    marginTop: 40,
  },
  forgetPassword: {
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
    padding: 20,
    fontSize: 20,
  },
});

export default PasswordResetScreen;
