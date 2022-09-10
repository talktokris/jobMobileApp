import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  const auth = useAuth();

  const handleSubmit = async (userInfo) => {
    setEstatus(false);
    // const result = await registerApi.request(userInfo);
    const result = await usersApi.register(userInfo);
    // console.log(result);
    setLoading(false);
    if (!result.ok) return;

    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.status == "success") {
      setEstatus(false);
      // console.log(result.data.message);

      const { data: authToken } = await loginApi.request(
        userInfo.email,
        userInfo.password
      );

      auth.logIn(authToken.access_token);

      //console.log(authToken);
    } else if (result.data.error.email) {
      setLoading(false);
      setEstatus(true);
      setError(result.data.error.email);
    } else if (result.data.error.password) {
      setLoading(false);
      setEstatus(true);
      setError(result.data.error.password);
    } else {
      setLoading(false);
      setEstatus(true);
      setError("Unknown error");
    }

    // console.log(result.error);
    // setLoading(false);
    /*
    if (result.data.message != "User registered Successfully") {
      setError(result.data.email);
    } else {
      const { data: authToken } = await loginApi.request(
        userInfo.email,
        userInfo.password
      );
      auth.logInAuto(authToken);
    }
    */
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      {<ActivityIndicator visible={registerApi.loading || loginApi.loading} />}
      <Screen>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <ErrorMessage error={error} visible={eStatus} />

          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="name"
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              placeholder="Name"
              textContentType="name"
            />
            <AppFormField
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
            />

            <AppFormField
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              textContentType="password"
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

            <SubmitButton title="Register" />
          </AppForm>
        </View>
      </Screen>
    </>
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
    marginTop: 20,
  },
});

export default RegisterScreen;
