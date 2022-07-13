import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Yup from "yup";

import JobsListItem from "../components/JobsListItem";
import Screen from "../components/Screen";
import Separater from "../components/Separater";
import routes from "../navigation/routes";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import AppFormSearch from "../components/forms/AppFormSearch";

const messages = [
  {
    id: 1,
    title: "Assistant Program Coordinator",
    subTitle: "Everent Pvt Ltd ",
    sallery: "RM 3000",
    location: "Kathmandu, Nepal",
    date: "3 days ago",
    fav: 1,
    image: require("../assets/images/av.jpg"),
  },
  {
    id: 2,
    title: "Assistant Program Coordinator",
    subTitle:
      "D1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
    sallery: "RM 3000",
    location: "Kathmandu, Nepal",
    date: "3 days ago",
    fav: 0,
    image: require("../assets/images/av.jpg"),
  },
  {
    id: 3,
    title: "Assistant Program Coordinator",
    subTitle:
      "D1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
    sallery: "RM 3000",
    location: "Kathmandu, Nepal",
    date: "3 days ago",
    fav: 1,
    image: require("../assets/images/av.jpg"),
  },
];

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
function JobsListScreen({ navigation }) {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    logIn(result.data);

    // console.log(user);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {/*} <AppTextSearch icon="magnify" placeholder="Search here" /> */}
          <AppFormSearch
            name="emails"
            autoCapitalize="none"
            autoCorrect={false}
            icon="magnify"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Search here"
          />
        </AppForm>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <JobsListItem
            title={item.title}
            subTitle={item.subTitle}
            sallery={item.sallery}
            image={item.image}
            location={item.location}
            date={item.date}
            fav={item.fav}
            onPress={() => navigation.navigate(routes.JOBS_DETAILS, item)}
            renderRightActions={() => (
              <View style={{ backgroundColor: "red", height: 70 }}></View>
            )}
          />
        )}
        ItemSeparatorComponent={Separater}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({});

export default JobsListScreen;
