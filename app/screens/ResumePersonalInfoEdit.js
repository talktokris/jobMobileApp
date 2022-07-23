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
import setting from "../config/setting";
import setList from "../api/setList";
import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import fonts from "../config/fonts";
import { ScrollView } from "react-native";

const validationSchema = Yup.object().shape({
  nationality: Yup.object().required().nullable().label("Nationality"),
  countryLiveIn: Yup.object().required().nullable().label("Country LiveIn"),
  maritalStatus: Yup.object().required().nullable().label("Marital Status"),
  religion: Yup.object().required().nullable().label("Religion"),
  weight: Yup.number().required().min(25).label("Weight"),
  feet: Yup.object().required().nullable().label("Feet"),
  inches: Yup.object().required().nullable().label("Inches"),
});
const maxDate = moment().subtract(1, "days").format("DD-MM-YYYY");
const minDate = moment().subtract(50, "years").format("DD-MM-YYYY");

function ResumePersonalInfoEdit({ route, navigation }) {
  const listing = route.params.item;
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  var dobGet = "";
  if (user.height == null) {
    dobGet: {
    }
  } else {
    dobGet: user.height;
  }
  const height = dobGet.split("-");

  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [skillLevel, setskillLevel] = useState(null);
  const [educationLevel, setEducationLevel] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    setList
      .country()
      .then((data) => {
        setskillLevel(data.data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

  const feetData = [
    { id: 1, title: "3 feet" },
    { id: 2, title: "4 feet" },
    { id: 3, title: "5 feet" },
    { id: 4, title: "6 feet" },
    { id: 5, title: "7 feet" },
    { id: 6, title: "8 feet" },
    { id: 7, title: "9 feet" },
    { id: 8, title: "10 feet" },
    { id: 9, title: "11 feet" },
  ];
  const inchesData = [
    { id: 1, title: "1 inch" },
    { id: 2, title: "2 inches" },
    { id: 3, title: "3 inches" },
    { id: 4, title: "4 inches" },
    { id: 5, title: "5 inches" },
    { id: 6, title: "6 inches" },
    { id: 7, title: "7 inches" },
    { id: 8, title: "8 inches" },
    { id: 9, title: "9 inches" },
    { id: 10, title: "10 inches" },
    { id: 11, title: "11 inches" },
    { id: 12, title: "12 inches" },
  ];
  const monthData = [
    { id: 1, title: "January" },
    { id: 2, title: "February" },
    { id: 3, title: "March" },
    { id: 4, title: "April" },
    { id: 5, title: "May" },
    { id: 6, title: "June" },
    { id: 7, title: "July" },
    { id: 8, title: "August" },
    { id: 9, title: "September" },
    { id: 10, title: "October" },
    { id: 11, title: "November" },
    { id: 12, title: "December" },
  ];

  const maritalStatusData = [
    { id: 1, title: "Single" },
    { id: 2, title: "Married" },
    { id: 3, title: "Widowed" },
    { id: 4, title: "Divorced" },
  ];

  const religionData = [
    { id: 1, title: "Christianity" },
    { id: 2, title: "Islam" },
    { id: 3, title: "Hinduism" },
    { id: 4, title: "Buddhism" },
    { id: 4, title: "Sikhism" },
    { id: 4, title: "Jainism" },
    { id: 4, title: "Others" },
  ];

  const handleSubmit = async (userInfo) => {
    // console.log(userInfo);

    const result = await userUpdate.userPersonalUpdate(
      userInfo,
      currrentUser,
      currrentUser
    );
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
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Screen>
        <ScrollView>
          <View style={styles.container}>
            <ErrorMessage error={error} visible={eStatus} />

            <AppForm
              initialValues={{
                nationality: user.nationality,
                countryLiveIn: user.countryLiveIn,
                maritalStatus: user.maritalStatus,
                religion: user.religion,
                weight: user.weight,
                feet: height[0],
                inches: height[1],
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {!isLoading && skillLevel && (
                <AppFormPicker
                  items={skillLevel}
                  name="nationality"
                  /* numberOfColumns={2} */
                  /* PickerItemComponent={PickerItem} */

                  placeholder="Nationality"
                  lebel="Nationality"

                  /* width="80%" */
                />
              )}

              {!isLoading && skillLevel && (
                <AppFormPicker
                  items={skillLevel}
                  name="countryLiveIn"
                  /* numberOfColumns={2} */
                  /* PickerItemComponent={PickerItem} */

                  placeholder="Country LiveIn"
                  lebel="Country LiveIn"

                  /* width="80%" */
                />
              )}

              <AppFormPicker
                items={maritalStatusData}
                name="maritalStatus"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Marital Status"
                lebel="Marital Status"

                /* width="80%" */
              />

              <AppFormPicker
                items={religionData}
                name="religion"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Religion"
                lebel="Religion"
                /* width="80%" */
              />
              <AppFormField
                name="weight"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Weight (KG)"
                width="50%"
                lebel="Weight (KG)"
              />

              <Text style={styles.lebel}>Height : </Text>
              <View style={styles.dateContainer}>
                <View style={styles.childLeft}>
                  <AppFormPicker
                    items={feetData}
                    name="feet"
                    /* numberOfColumns={2} */
                    /* PickerItemComponent={PickerItem} */

                    placeholder="Feet"

                    /* width="80%" */
                  />
                </View>

                <View style={styles.childRight}>
                  <AppFormPicker
                    items={inchesData}
                    name="inches"
                    /* numberOfColumns={2} */
                    /* PickerItemComponent={PickerItem} */

                    placeholder="Inches"

                    /* width="80%" */
                  />
                </View>
              </View>

              <SubmitButton title="SAVE" />
            </AppForm>
          </View>
        </ScrollView>
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
  dateContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  childLeft: { width: "50%" },
  childRight: { width: "50%" },
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.medium,
  },
});

export default ResumePersonalInfoEdit;
