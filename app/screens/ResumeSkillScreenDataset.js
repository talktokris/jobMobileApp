import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormPicker,
} from "../components/forms";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const mainData = [
  {
    userId: 1,
    id: 1,
    title: "Java",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "Krishna",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "PHP",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "Raja",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "Harry",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "Aarati",
    completed: false,
  },
  {
    userId: 1,
    id: 7,
    title: "Ben",
    completed: false,
  },
  {
    userId: 1,
    id: 8,
    title: "Kris",
    completed: true,
  },
];

function ResumeSkillScreen({ navigation }) {
  const [error, setError] = useState();

  const [selectedItem, setSelectedItem] = useState(null);

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
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              inputContainerStyle={styles.autoComText}
              closeOnSubmit={false}
              initialValue={{ id: "2" }} // or just '2'
              onSelectItem={setSelectedItem}
              dataSet={[
                { id: "1", title: "Alpha" },
                { id: "2", title: "Beta" },
                { id: "3", title: "Gamma" },
              ]}
            />
            <AppFormPicker
              items={categoriesList}
              name="category"
              /* numberOfColumns={2} */
              /* PickerItemComponent={PickerItem} */
              icon="apps"
              placeholder="Category"
              /* width="80%" */
            />
            <AppFormField
              name="name"
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              placeholder="Name"
              textContentType="name"
            />
            <AppFormField
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
            />

            <AppFormField
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
            />

            <SubmitButton title="Register" />
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
