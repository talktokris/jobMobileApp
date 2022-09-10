import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function AuthTaskDoneScreen({ route, navigation }) {
  const listing = route.params.message;
  return (
    <View style={styles.container}>
      <AppText title={listing} />

      <MaterialCommunityIcons
        style={styles.icon}
        name="check-circle"
        size={80}
        color={colors.green}
      />
      <Text style={styles.test}>{listing}</Text>
      <View style={styles.buttonDiv}>
        <AppButton
          title="Ok"
          onPress={() => navigation.navigate(routes.AUTH_LOGIN)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonDiv: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  animations: { width: 150 },
  test: { padding: 20, marginTop: 20, marginBottom: 20, fontSize: 18 },
});

export default AuthTaskDoneScreen;
