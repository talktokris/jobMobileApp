import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
  AppFormPicker,
} from "../components/forms";

import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import setList from "../api/setList";
import userUpdate from "../api/userUpdate";

const validationSchema = Yup.object().shape({
  skillName: Yup.string().required().min(2).label("Skill Name"),
  skill_level: Yup.object().required().nullable().label("Skill Level"),
  //  skill_level: Yup.object().required().nullable().label("Skill Level"),
  // skillName: Yup.string().required().min(4).label("Password"),
});

function ResumeSkillScreen({ navigation }) {
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
    const result = await userUpdate.skillCreate(userInfo, currrentUser);
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
            initialValues={{ skillName: "", skill_level: "" }}
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

export default ResumeSkillScreen;
