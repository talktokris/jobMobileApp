import React, { useState, useEffect, useCallback } from "react";
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
import setting from "../config/setting";
import setList from "../api/setList";
import userUpdate from "../api/userUpdate";

const validationSchema = Yup.object().shape({
  skillName: Yup.object().required().nullable().label("Skill Level"),
  skill_level: Yup.object().required().nullable().label("Skill Level"),
  //  skill_level: Yup.object().required().nullable().label("Skill Level"),
  // skillName: Yup.string().required().min(4).label("Password"),
});

function ResumeLanguageScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);
  const [skillLevel, setskillLevel] = useState(null);
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    setList
      .skillLevel()
      .then((data) => {
        setskillLevel(data.data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });

    // Fatching Skill Data
    setLoading(true);
    setList
      .skill()
      .then((data) => {
        setSkill(data.data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

  const skillApi = useApi(userUpdate.skillCreate);
  /* const loginApi = useApi(authApi.login);

  const auth = useAuth();
 
*/
  const handleSubmit = async (userInfo) => {
    // console.log(userInfo);
    const result = await userUpdate.skillCreate(userInfo, currrentUser);
    console.log(result);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpedted error occurred");
        // console.log(result);
      }
      return;
    }
    /*
    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
   // auth.logIn(authToken);
   */
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <ErrorMessage error={error} visible={setError} />

          <AppForm
            initialValues={{ skillName: "", skill_level: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {!isLoading && skillLevel && (
              <AppFormPicker
                items={skill}
                name="skillName"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Skill Name"

                /* width="80%" */
              />
            )}

            {!isLoading && skillLevel && (
              <AppFormPicker
                items={skillLevel}
                name="skill_level"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Experience"

                /* width="80%" */
              />
            )}

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
