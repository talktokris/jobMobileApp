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
  level: Yup.string().required().min(2).label("Education Level"),

  school: Yup.string().required().min(4).label("School / University Name"),
  country: Yup.string().required().min(2).label("Country"),
  subject: Yup.string().required().min(4).label("Subject / Faculty"),
  fromYear: Yup.number().required().min(1850).label("From Year"),
  fromMonth: Yup.string().required().min(2).label("From Month"),
  toYear: Yup.number().required().min(1850).label("From Year"),
  toMonth: Yup.string().required().min(2).label("To Month"),
});
const maxDate = moment().subtract(1, "days").format("DD-MM-YYYY");
const minDate = moment().subtract(50, "years").format("DD-MM-YYYY");

function ResumeEducationScreenEdit({ route, navigation }) {
  const listing = route.params.item;
  const fromDate = route.params.item.edu.startDate.split("-");
  const toDate = route.params.item.edu.endDate.split("-");
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
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

    setList
      .education()
      .then((data) => {
        setEducationLevel(data.data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

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

  const handleSubmit = async (userInfo) => {
    //console.log(userInfo);

    const result = await userUpdate.educationUpdate(
      userInfo,
      currrentUser,
      route.params.item.edu.id
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
                level: route.params.item.edu.level,
                school: route.params.item.edu.school,
                country: route.params.item.edu.country,
                subject: route.params.item.edu.subject,
                fromYear: fromDate[1].trim(),
                fromMonth: fromDate[0].trim(),
                toYear: toDate[1].trim(),
                toMonth: toDate[0].trim(),
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {!isLoading && educationLevel && (
                <AppFormPickerEdit
                  items={educationLevel}
                  name="level"
                  /* numberOfColumns={2} */
                  /* PickerItemComponent={PickerItem} */

                  placeholder="Educaion Level"

                  /* width="80%" */
                />
              )}
              <AppFormField
                name="school"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="School / University Name"
              />

              {!isLoading && skillLevel && (
                <AppFormPickerEdit
                  items={skillLevel}
                  name="country"
                  /* numberOfColumns={2} */
                  /* PickerItemComponent={PickerItem} */

                  placeholder="Country"

                  /* width="80%" */
                />
              )}

              <AppFormField
                name="subject"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Subject / Faculty"
              />

              <Text style={styles.lebel}>From Date : </Text>
              <View style={styles.dateContainer}>
                <View style={styles.childLeft}>
                  <AppFormField
                    name="fromYear"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Year"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>

                <View style={styles.childRight}>
                  <AppFormPickerEdit
                    items={monthData}
                    name="fromMonth"
                    /* numberOfColumns={2} */
                    /* PickerItemComponent={PickerItem} */

                    placeholder="Month"

                    /* width="80%" */
                  />
                </View>
              </View>

              <Text style={styles.lebel}>To Date : </Text>
              <View style={styles.dateContainer}>
                <View style={styles.childLeft}>
                  <AppFormField
                    name="toYear"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Year"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>

                <View style={styles.childRight}>
                  <AppFormPickerEdit
                    items={monthData}
                    name="toMonth"
                    /* numberOfColumns={2} */
                    /* PickerItemComponent={PickerItem} */

                    placeholder="Month"

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

export default ResumeEducationScreenEdit;
