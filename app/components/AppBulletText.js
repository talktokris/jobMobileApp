import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppBulletText({ iconName, title }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={iconName}
        size={15}
        color={colors.medium}
      />
      <View style={styles.appTextContainer}>
        <AppText style={styles.title} numberOfLines={3}>
          {title}
        </AppText>
      </View>
    </View>
  );
}

export default AppBulletText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  appTextContainer: {
    padding: 5,
    marginLeft: 5,
    marginRight: 10,
    justifyContent: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.medium,
  },
});
