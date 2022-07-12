import React, { useState, useEffect } from "react";
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
import Autocomplete from "react-native-autocomplete-input";

import CategoryPickerItem from "../components/CategoryPickerItem";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

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

  const [MainJSON, setMainJSON] = useState(mainData);
  const [FilterData, setFilterData] = useState([]);
  const [selectedItem, setselectedItem] = useState({});

  //const { userId, id, title, completed } = this.props.value;

  /*
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => res.json())
      .then((json) => {
        // var as = json2array(json);
        setMainJSON(json);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);
*/
  const SearchDataFromJSON = (query) => {
    if (query) {
      //Making the Search as Case Insensitive.
      const regex = new RegExp(`${query.trim()}`, "i");
      setFilterData(MainJSON.filter((data) => data.title.search(regex) >= 0));
    } else {
      setFilterData([]);
    }
  };
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
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.AutocompleteStyle}
          data={FilterData}
          // data={FilterData}
          defaultValue={
            JSON.stringify(selectedItem) === "{}" ? "" : selectedItem.title
          }
          keyExtractor={(item, i) => i.toString()}
          onChangeText={(text) => {
            SearchDataFromJSON(text);
            console.log(FilterData);
          }}
          placeholder="Type The Search Keyword..."
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setselectedItem(JSON.stringify(item.title));
                setFilterData();
              }}
            >
              <Text style={styles.SearchBoxTextItem}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.selectedTextContainer}></View>

        <View style={styles.container}>
          {/*  <ErrorMessage error={error} visible={setError} /> */}

          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={() => console.log("clicked")}
            validationSchema={validationSchema}
          >
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
  AutocompleteStyle: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    borderWidth: 1,
    width: "60%",
    backgroundColor: "red",
  },
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
  },
  selectedTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  selectedTextStyle: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default ResumeSkillScreen;
