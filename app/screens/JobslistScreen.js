import React, { useState, useEffect } from "react";
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

import jobs from "../api/jobs";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import settings from "../config/setting";
import SubmitIcon from "../components/forms/SubmitIcon";

const validationSchema = Yup.object().shape({
  //words: Yup.string().required().label("Search World"),
});
function JobsListScreen({ navigation }) {
  const [search, setSearch] = useState(0);
  if (search === 0) {
    var getListingsAPi = useApi(jobs.getJobListings);
  } else {
    var getListingsAPi = useApi(jobs.getJobSearchReults, { search });
  }
  useEffect(() => {
    getListingsAPi.request(search);
  }, [search]);

  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async (words) => {
    //  console.log(words.words);
    if (words.words == "") {
      setSearch(0);
    } else {
      setSearch(words.words);
    }

    /*
    const result = await jobs.getJobSearchReults(words);

    if (!result.ok) return setLoginFailed(true);
    getListingsAPi = result;
    console.log(result);
  
    setLoginFailed(false);
    //  logIn(result.data);
*/
    // console.log(user);
  };

  return (
    <>
      <ActivityIndicator visible={getListingsAPi.loading} />
      <Screen>
        <View style={styles.container}>
          <ErrorMessage
            error="Invalid email and/or password"
            visible={loginFailed}
          />
          <AppForm
            initialValues={{ words: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {/*} <AppTextSearch icon="magnify" placeholder="Search here" /> */}

            <AppFormSearch
              name="words"
              autoCapitalize="none"
              autoCorrect={false}
              icon="magnify"
              keyboardType="default"
              textContentType="jobTitle"
              placeholder="Search here"
            />
          </AppForm>
        </View>
        <FlatList
          data={getListingsAPi.data}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <JobsListItem
              title={item.title}
              subTitle={item.subTitle}
              sallery={item.salleryMax}
              image={{
                uri: settings.imageUrl + "jobs/" + item.id + "/" + item.image,
              }}
              location={item.location}
              date={item.date}
              favData={item.get_fav_info}
              onPress={() => navigation.navigate(routes.JOBS_DETAILS, item)}
              renderRightActions={() => (
                <View style={{ backgroundColor: "red", height: 70 }}></View>
              )}
            />
          )}
          ItemSeparatorComponent={Separater}
        />
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({});

export default JobsListScreen;
