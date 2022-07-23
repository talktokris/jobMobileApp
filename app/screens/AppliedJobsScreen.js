import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Yup from "yup";

import JobsListItemView from "../components/JobsListItemView";
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
import NoDataMessage from "../components/forms/NoDataMessage";
import userUpdate from "../api/userUpdate";

const validationSchema = Yup.object().shape({
  //words: Yup.string().required().label("Search World"),
});
function AppliedJobsScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  /*
  useEffect(() => {
    getData();
  }, []);

  */

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    userUpdate
      .jobAppliedFatch(currrentUser)
      .then((data) => {
        setUsers(data);
        setLoading(false);
        // console.log(data.data);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

  return (
    <>
      <Screen>
        <ActivityIndicator visible={isLoading} />
        {!isLoading && users.data ? (
          <FlatList
            data={users.data}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <JobsListItemView
                title={item.get_ads_apply_info.title}
                subTitle={item.get_ads_apply_info.subTitle}
                sallery={item.get_ads_apply_info.salleryMax}
                image={{
                  uri:
                    settings.imageUrl +
                    "jobs/" +
                    item.get_ads_apply_info.id +
                    "/" +
                    item.get_ads_apply_info.image,
                }}
                location={item.get_ads_apply_info.location}
                date={item.get_ads_apply_info.date_expire}
                favData={[]}
                job_id={item.get_ads_apply_info.id}
                currency={item.get_ads_apply_info.currency}
                onPress={() => navigation.navigate(routes.JOBS_DETAILS, item)}
                renderRightActions={() => (
                  <View style={{ backgroundColor: "red", height: 70 }}></View>
                )}
              />
            )}
            ItemSeparatorComponent={Separater}
          />
        ) : (
          <NoDataMessage title="No Jobs Found" />
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({});

export default AppliedJobsScreen;
