import React from "react";
import { View, TextInput, StyleSheet, Platform, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";

function AppTextInput({ icon, lebel, width = "100%", ...otherProps }) {
  return (
    <>
      {lebel && <Text style={styles.lebel}>{lebel} :</Text>}
      <View style={[styles.container, { width: width }]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            style={styles.icon}
            color={colors.medium}
          />
        )}
        <TextInput
          placeholderTextColor={colors.medium}
          style={styles.textInput}
          {...otherProps}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  textInput: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.dark,
  },
  icon: {
    marginRight: 10,
    padding: Platform.OS === "android" ? 7 : 5,
  },
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.medium,
  },
});

export default AppTextInput;
