import React, { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
  AppFormPicker,
} from "../components/forms";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import CategoryPickerItem from "../components/CategoryPickerItem";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import AppAutoComplete from "../components/AppAutoComplete";
import AppFormAutoComplete from "../components/forms/AppFormAutoComplete";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function ResumeLanguageScreen({ navigation }) {
  const [error, setError] = useState();
  const [MainJSON, setMainJSON] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const languagesData = [
    { id: 1, title: "English" },
    { id: 2, title: "Bhasa Malaysia" },
    { id: 3, title: "Nepali" },
    { id: 4, title: "Hindi" },
    { id: 5, title: "Bangali" },
  ];

  const experienceData = [
    { value: 1, lebel: "No experience" },
    { value: 2, lebel: "Basic" },
    { value: 3, lebel: "Intermediate" },
    { value: 4, lebel: "Advanced" },
    { value: 5, lebel: "Fluent" },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => res.json())
      .then((json) => {
        // var as = json2array(json);
        setMainJSON(json);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const categoriesList = [
    { lebel: "Furniture", value: 1, backgroundColor: "red", icon: "apps" },
    { lebel: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
    { lebel: "Electronics", value: 3, backgroundColor: "purple", icon: "lock" },
    { lebel: "Camera", value: 4, backgroundColor: "orange", icon: "apps" },
  ];

  /*
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  const auth = useAuth();
 

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpedted error occurred");
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };
*/
  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <Screen>
        <View style={styles.container}>
          {/*  <ErrorMessage error={error} visible={setError} /> */}

          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={() => console.log("clicked")}
            validationSchema={validationSchema}
          >
            <AppFormAutoComplete
              dataSet={languagesData}
              name="languageName"
              zIndex={5}
              placeHolderText="Language Name"
            />

            <AppFormPicker
              items={experienceData}
              name="experience"
              /* numberOfColumns={2} */
              /* PickerItemComponent={PickerItem} */

              placeholder="Experience"

              /* width="80%" */
            />
            {/*
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              inputContainerStyle={styles.autoComText}
              closeOnSubmit={false}
              initialValue={{ id: "2" }} // or just '2'
              onSelectItem={setSelectedItem}
              dataSet={MainJSON}
            />
        
            {/* 
          
         
            <AppFormField
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              lebel="Email Address"
              textContentType="emailAddress"
            />

            <AppFormField
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              lebel="Password"
              textContentType="password"
              secureTextEntry={true}
            />
            */}

            <SubmitButton title="SAVE" />
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
    width: 150,
    height: 110,
    alignSelf: "center",
    margin: 30,
    marginTop: 50,
  },
  autoComText: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
});

export default ResumeLanguageScreen;