import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  SubmitButton,
  ErrorMessage,
  AppFormPickerEdit,
} from "../components/forms";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import setList from "../api/setList";
import userUpdate from "../api/userUpdate";

const validationSchema = Yup.object().shape({
  language_name: Yup.string().required().min(1).label("Language"),
  language_level: Yup.string().required().min(1).label("Language Level"),

});

function ResumeLanguageScreenEdit({ route, navigation }) {
  const listing = route.params.item;
  //console.log(route.params.item.ln);
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
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
      .languageLevel()
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
      .language()
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
    const result = await userUpdate.languageUpdate(
      userInfo,
      currrentUser,
      route.params.item.ln.id
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
        <View style={styles.container}>
          <ErrorMessage error={error} visible={eStatus} />

          <AppForm
            initialValues={{
              language_name: route.params.item.ln.language_name,
              language_level: route.params.item.ln.language_level,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {!isLoading && skillLevel && (
              <AppFormPickerEdit
                items={skill}
                name="language_name"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Language Name"

                /* width="80%" */
              />
            )}

            {!isLoading && skillLevel && (
              <AppFormPickerEdit
                items={skillLevel}
                name="language_level"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Language Name"

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

export default ResumeLanguageScreenEdit;
