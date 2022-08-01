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
  AppFormPickerEdit,
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
  name: Yup.string().required().min(2).label("First Name"),
  // middleName: Yup.string().required().min(2).label("Middle Name"),
  //lastName: Yup.string().required().min(2).label("Last Name"),
  profile_type: Yup.string().required().min(2).label("Profile Type"),
  sex: Yup.string().required().min(2).label("Gender"),

  year: Yup.number()
    .required("Invalid Year")
    .typeError("Invalid Year")
    .min(1850, "Invalid Year")
    .max(2022, "Invalid Year"),
  month: Yup.string().required().min(1).label("Month"),
  day: Yup.string().required().min(1).label("Day"),
  mobileNo: Yup.number().required().label("Moble No"),
});
const maxDate = moment().subtract(1, "days").format("DD-MM-YYYY");
const minDate = moment().subtract(50, "years").format("DD-MM-YYYY");

function ResumeBasicInfoEdit({ route, navigation }) {
  const { user, logOut } = useAuth();
  const users = route.params.item;
  const currrentUser = user.id;

  var dobGet = "";
  if (users.dob == null) {
    dobGet = "";
  } else {
    dobGet = users.dob;
  }

  const dob = dobGet.split("-");
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

  const profileSet = [
    { id: 1, title: "Professional" },
    { id: 2, title: "Skill People" },
    { id: 3, title: "General Worker" },
  ];

  const sexSet = [
    { id: 1, title: "Male" },
    { id: 2, title: "Female" },
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

  const dayData = [
    { id: 1, title: 1 },
    { id: 2, title: 2 },
    { id: 3, title: 3 },
    { id: 4, title: 4 },
    { id: 5, title: 5 },
    { id: 6, title: 6 },
    { id: 7, title: 7 },
    { id: 8, title: 8 },
    { id: 9, title: 9 },
    { id: 10, title: 10 },
    { id: 11, title: 11 },
    { id: 12, title: 12 },
    { id: 13, title: 13 },
    { id: 14, title: 14 },
    { id: 15, title: 15 },
    { id: 16, title: 16 },
    { id: 17, title: 17 },
    { id: 18, title: 18 },
    { id: 19, title: 19 },
    { id: 20, title: 20 },
    { id: 21, title: 21 },
    { id: 22, title: 22 },
    { id: 23, title: 23 },
    { id: 24, title: 24 },
    { id: 25, title: 25 },
    { id: 26, title: 26 },
    { id: 27, title: 27 },
    { id: 28, title: 28 },
    { id: 29, title: 29 },
    { id: 30, title: 30 },
    { id: 31, title: 31 },
  ];

  const handleSubmit = async (userInfo) => {
    // console.log(userInfo);

    const result = await userUpdate.userBasicUpdate(
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
                name: users.name,
                // middleName: users.middleName,
                // lastName: users.lastName,
                profile_type: users.profile_type,
                sex: users.sex,
                year: dob[0],
                month: userUpdate.dateNumberToString(dob[1]),
                day: dob[2],
                mobileNo: users.mobileNo,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppFormField
                name="name"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="First Name"
              />

              <AppFormPickerEdit
                items={profileSet}
                name="profile_type"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Profile Type"
              />
              {/* <Text style={styles.lebel}>Name : </Text>
            
              <View style={styles.dateContainer}>
                <View style={styles.childLeft}>
                  <View style={styles.dateContainer}>
                    <View style={styles.childLeftSub}>
                      <AppFormField
                        name="firstName"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="First Name"
                      />
                    </View>
                    <View style={styles.childRightSub}>
                      <AppFormField
                        name="middleName"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Middle Name"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.childRight}>
                  <AppFormField
                    name="lastName"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Last Name"
                  />
                </View>
              </View>
            */}
              <AppFormPickerEdit
                items={sexSet}
                name="sex"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Gender"
              />

              <AppFormField
                name="mobileNo"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Mobile No"
                keyboardType="numeric"
                maxLength={11}
                lebel="Mobile No :"
              />
              <Text style={styles.lebel}>Date of Birth : </Text>
              <View style={styles.dateContainer}>
                <View style={styles.childLeft}>
                  <View style={styles.dateContainer}>
                    <View style={styles.childLeftSub}>
                      <AppFormField
                        name="year"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Year"
                        keyboardType="numeric"
                        maxLength={4}
                      />
                    </View>
                    <View style={styles.childRightSub}>
                      <AppFormPickerEdit
                        items={monthData}
                        name="month"
                        placeholder="Month"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.childRight}>
                  <AppFormPickerEdit
                    items={dayData}
                    name="day"
                    placeholder="Day"
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
  childLeft: { width: "70%" },
  childRight: { width: "30%" },
  childLeftSub: { width: "40%" },
  childRightSub: { width: "60%" },
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.medium,
  },
});

export default ResumeBasicInfoEdit;
