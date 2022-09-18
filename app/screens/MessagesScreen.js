import React, { useState, useCallback } from "react";

import { View, StyleSheet, FlatList } from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
import NoDataMessage from "../components/forms/NoDataMessage";
import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";


function MessagesScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

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
      .messageFatch(currrentUser)
      .then((data) => {
        setUsers(data);
        // console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);
  // console.log(users);
  var key = 1;
  return (
    <Screen>
      <ActivityIndicator visible={isLoading} />
      {!isLoading && users.data ? (
        <FlatList
          data={users.data}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.message}
              // onPress={() => console.log("Message Selected:- " + item.id)}
              onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
              renderRightActions={() => (
                <View style={{ backgroundColor: "red", height: 70 }}></View>
              )}
            />
          )}
          ItemSeparatorComponent={Separater}
        />
      ) : (
        <NoDataMessage title="No Messages Found" />
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({});

export default MessagesScreen;
