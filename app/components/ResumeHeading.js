import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ResumeHeading({ id, title, type = "Add", onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.appTextContainer}>
        <AppText style={styles.heading} numberOfLines={1}>
          {title}
        </AppText>
      </View>
      {type == "Add" && (
        <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
          <View style={styles.addBtn}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="plus-circle-outline"
              size={25}
              color={colors.white}
            />
          </View>
        </TouchableHighlight>
      )}
      {type == "Update" && (
        <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
          <View style={styles.updateBtn}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="pencil-circle-outline"
              size={25}
              color={colors.white}
            />
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
}

export default ResumeHeading;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,

    alignItems: "center",
  },
  appTextContainer: {
    marginLeft: 5,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  heading: { fontSize: 18, fontWeight: "900", color: colors.primary },
  addBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    paddingLeft: 1.5,
    paddingTop: 1.5,
  },
  updateBtn: {
    flexDirection: "row",
    backgroundColor: colors.orange,
    paddingLeft: 1.5,
    paddingTop: 1.5,
    width: 28,
    height: 28,
    borderRadius: 13,
  },
  btnText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.white,
  },
});
