import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
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
  AppFormPickerEdit,
} from "../components/forms";

import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import setList from "../api/setList";
import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import fonts from "../config/fonts";
import { ScrollView } from "react-native";

const validationSchema = Yup.object().shape({
  nationality: Yup.string().required().min(2).label("Nationality"),
  countryLiveIn: Yup.string().required().min(2).label("Country LiveIn"),
  maritalStatus: Yup.string().required().min(2).label("Marital Status"),
  religion: Yup.string().required().min(2).label("Religion"),
  weight: Yup.number()
    .typeError("Invalid Age")
    .min(25, "Invalid Age")
    .max(150, "Invalid Age"),

  feet: Yup.string().required().min(2).label("Feet"),
  inches: Yup.string().required().min(2).label("Inches"),
});
const maxDate = moment().subtract(1, "days").format("DD-MM-YYYY");
const minDate = moment().subtract(50, "years").format("DD-MM-YYYY");

function ResumePersonalInfoEdit({ route, navigation }) {
  const users = route.params.item;

  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  var dobGet = "";
  feet = "";
  inches = "";
  if (users.height == null) {
    dobGet = "";
    feet = "";
    inches = "";
  } else {
    dobGet = users.height;
    var height = dobGet.split(" - ");
    feet = height[0];
    inches = height[1];
  }
  // const height = dobGet.split("-");
  //console.log(inches);
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
    { id: 5, title: "Sikhism" },
    { id: 6, title: "Jainism" },
    { id: 7, title: "Others" },
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
                nationality: users.nationality,
                countryLiveIn: users.countryLiveIn,
                maritalStatus: users.maritalStatus,
                religion: users.religion,
                //   weight: users.weight,
                weight: "" + users.weight + "",
                feet: feet,
                inches: inches,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {!isLoading && skillLevel && (
                <AppFormPickerEdit
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
                <AppFormPickerEdit
                  items={skillLevel}
                  name="countryLiveIn"
                  /* numberOfColumns={2} */
                  /* PickerItemComponent={PickerItem} */

                  placeholder="Country LiveIn"
                  lebel="Country LiveIn"

                  /* width="80%" */
                />
              )}

              <AppFormPickerEdit
                items={maritalStatusData}
                name="maritalStatus"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Marital Status"
                lebel="Marital Status"

                /* width="80%" */
              />

              <AppFormPickerEdit
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
                lebel="Weight (KG)"
              />

              <Text style={styles.lebel}>Height : </Text>
              <View style={styles.dateContainer}>
                <View style={styles.childLeft}>
                  <AppFormPickerEdit
                    items={feetData}
                    name="feet"
                    /* numberOfColumns={2} */
                    /* PickerItemComponent={PickerItem} */

                    placeholder="Feet"

                    /* width="80%" */
                  />
                </View>

                <View style={styles.childRight}>
                  <AppFormPickerEdit
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
