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
  AppFormPickerEdit,
} from "../components/forms";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import routes from "../navigation/routes";
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
  skillName: Yup.string().required().min(2).label("Skill Name"),
  skill_level: Yup.string().required().min(1).label("Skill Level"),

  //  skill_level: Yup.object().required().nullable().label("Skill Level"),
  // skillName: Yup.string().required().min(4).label("Password"),
});

function ResumeSkillScreenEdit({ route, navigation }) {
  const listing = route.params.item;
  //console.log(route.params.item.d);
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [skillLevel, setskillLevel] = useState(null);

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
  }, []);

  const skillApi = useApi(userUpdate.skillCreate);
  /* const loginApi = useApi(authApi.login);

  const auth = useAuth();
 
*/
  const handleSubmit = async (userInfo) => {
    const result = await userUpdate.skillUpdate(
      userInfo,
      currrentUser,
      route.params.item.d.id
    );
    //  console.log(result);
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
        <View style={styles.container}>
          <ErrorMessage error={error} visible={eStatus} />

          <AppForm
            initialValues={{
              skillName: route.params.item.d.skillName,
              skill_level: route.params.item.d.skill_level,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="skillName"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Skill Name"
              lebel="EX: C++, Java, Electrician ,Plumber..."
            />

            {!isLoading && skillLevel && (
              <AppFormPickerEdit
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

export default ResumeSkillScreenEdit;
