import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Yup from "yup";

import JobsListItemView from "../components/JobsListItemView";
import Screen from "../components/Screen";
import Separater from "../components/Separater";
import routes from "../navigation/routes";

import ActivityIndicator from "../components/ActivityIndicator";
import settings from "../config/setting";
import NoDataMessage from "../components/forms/NoDataMessage";
import userUpdate from "../api/userUpdate";

const validationSchema = Yup.object().shape({
  //words: Yup.string().required().label("Search World"),
});
function FavListScreen({ navigation }) {
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
      .jobFabFatch(currrentUser)
      .then((data) => {
        //   if(data.get_fav_list)

        //   console.log("Hi" + data[0].get_fav_list);

        setUsers(data);

        setLoading(false);
        // console.log(data);
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
          //{users.data.get_fav_list!="null" ? (

          <FlatList
            data={users.data}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => {
              if (item.get_fav_list != null) {
                return (
                  <JobsListItemView
                    title={item.get_fav_list.title}
                    subTitle={item.get_fav_list.subTitle}
                    sallery={item.get_fav_list.salleryMax}
                    image={{
                      uri:
                        settings.imageUrl +
                        "jobs/" +
                        item.get_fav_list.id +
                        "/" +
                        item.get_fav_list.image,
                    }}
                    location={item.get_fav_list.location}
                    date={item.get_fav_list.date_expire}
                    favData={[]}
                    job_id={item.get_fav_list.id}
                    currency={item.get_fav_list.currency}
                    onPress={() =>
                      navigation.navigate(routes.JOBS_DETAILS, item)
                    }
                    renderRightActions={() => (
                      <View
                        style={{ backgroundColor: "red", height: 70 }}
                      ></View>
                    )}
                  />
                );
              }
            }}
            ItemSeparatorComponent={Separater}
          />
        ) : (
          <NoDataMessage title="No Favorite Jobs Found" />
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({});

export default FavListScreen;
