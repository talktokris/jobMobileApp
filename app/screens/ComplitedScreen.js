import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import * as Progress from "react-native-progress";
import colors from "../config/colors";
import LottieView from "lottie-react-native";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function ComplitedScreen({ route, navigation }) {
  const listing = route.params.message;
  return (
    <View style={styles.container}>
      <AppText title={listing} />

      <MaterialCommunityIcons
        style={styles.icon}
        name="check-circle"
        size={50}
        color={colors.medium}
      />
      <Text style={styles.test}>{listing}</Text>
      <View style={styles.buttonDiv}>
        <AppButton
          title="Ok"
          onPress={() => navigation.navigate(routes.PRO_RESUME)}
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
  test: { padding: 10 },
});

export default ComplitedScreen;
