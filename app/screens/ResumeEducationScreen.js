import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import * as Yup from "yup";
import moment from "moment";
moment().format();

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
import AppFormDatePicker from "../components/forms/AppFormDatePicker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const maxDate = moment().subtract(1, "days").format("DD-MM-YYYY");
const minDate = moment().subtract(50, "years").format("DD-MM-YYYY");

function ResumeEducationScreen({ navigation }) {
  const [error, setError] = useState();
  const [MainJSON, setMainJSON] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [date, setDate] = useState("");
  const languagesData = [
    { id: 1, title: "O/N Level" },
    { id: 2, title: "A-Level" },
    { id: 3, title: "Secondry School(SLC)" },
    { id: 4, title: "High School" },
    { id: 5, title: "Vocational/Diploma" },
    { id: 6, title: "Bachelor" },
    { id: 7, title: "Master" },
    { id: 8, title: "Phd" },
  ];

  const experienceData = [
    { value: 1, lebel: "No experience" },
    { value: 2, lebel: "Basic" },
    { value: 3, lebel: "Intermediate" },
    { value: 4, lebel: "Advanced" },
    { value: 5, lebel: "Fluent" },
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
              name="educationName"
              placeHolderText="Education Level"
            />

            <AppFormField
              name="organizationName"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Organization Name"
              textContentType="emailAddress"
            />

            <AppFormDatePicker
              name="fromDate"
              width="60%"
              mode="date" //The enum of date, datetime and time
              format="DD-MM-YYYY"
              minDate={minDate}
              maxDate={maxDate}
              placeholder="From Date"
            />

            <AppFormDatePicker
              name="toDate"
              width="60%"
              mode="date" //The enum of date, datetime and time
              format="DD-MM-YYYY"
              minDate={minDate}
              maxDate={maxDate}
              placeholder="From Date"
            />

            <AppFormField
              maxLength={255}
              multiline
              name="description"
              numberOfLines={4}
              placeholder="Details about education"
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

export default ResumeEducationScreen;
