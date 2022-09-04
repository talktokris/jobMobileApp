import React, { useState, useCallback } from "react";

import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
import userUpdate from "../api/userUpdate";
import AppText from "../components/AppText";
import colors from "../config/colors";

function MessagesScreenView({ route, navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  const message = route.params;

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
      <View style={styles.container}>
        <AppText style={styles.haedings}>{message.title}</AppText>
        <AppText style={styles.message}>{message.message}</AppText>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  haedings: {
    marginVertical: 20,
    color: colors.dark,
    fontWeight: "bold",
    borderBottomColor: colors.medium,
  },
});

export default MessagesScreenView;
