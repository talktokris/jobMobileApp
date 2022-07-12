import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ResumeInnerView({
  id,
  viewID = null,
  titleOne = null,
  titleTwo = null,
  titleThree = null,
  titleFour = null,
  titleFive = null,
  titleSix = null,
  titleSeven = null,
  titleEight = null,
  onPressDelete = null,
  onPressUpdate = null,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.appTextContainer}>
        <AppText style={styles.heading} numberOfLines={1}>
          {titleOne}
        </AppText>
        {titleTwo && (
          <AppText style={styles.subTitle} numberOfLines={1}>
            {titleTwo}
          </AppText>
        )}
        {titleThree && (
          <AppText style={styles.moreText} numberOfLines={1}>
            {titleThree}
          </AppText>
        )}
        {titleFour && (
          <AppText style={styles.moreText} numberOfLines={1}>
            {titleFour}
          </AppText>
        )}
      </View>
      <View style={styles.appTextContainer}>
        {titleFive && (
          <AppText style={styles.heading} numberOfLines={2}>
            {titleFive}
          </AppText>
        )}
        {titleSix && (
          <AppText style={styles.subTitle} numberOfLines={2}>
            {titleSix}
          </AppText>
        )}
        {titleSeven && (
          <AppText style={styles.moreText} numberOfLines={2}>
            {titleSeven}
          </AppText>
        )}
        {titleEight && (
          <AppText style={styles.moreTextLast} numberOfLines={2}>
            {titleEight}
          </AppText>
        )}
      </View>
      <View style={styles.btnContainer}>
        {onPressUpdate && (
          <TouchableHighlight
            underlayColor={colors.lightGray}
            onPress={onPressUpdate}
          >
            <View style={styles.updateBtn}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="pencil-circle-outline"
                size={22}
                color={colors.medium}
              />
            </View>
          </TouchableHighlight>
        )}

        {onPressDelete && (
          <TouchableHighlight
            underlayColor={colors.lightGray}
            onPress={onPressDelete}
          >
            <View style={styles.deleteBtn}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="close-circle-outline"
                size={22}
                color={colors.medium}
              />
            </View>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}

export default ResumeInnerView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.white,

    alignItems: "center",
    borderTopWidth: 2,
    borderColor: colors.grayOne,
  },
  appTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  heading: { fontSize: 14, fontWeight: "900" },
  subTitle: { fontSize: 12, fontWeight: "600" },
  moreText: { fontSize: 12, fontWeight: "400" },
  moreTextLast: { fontSize: 12 },

  btnContainer: {
    flexDirection: "column",
    padding: 0,
    width: 20,
    height: 60,
    marginRight: 10,
  },
  updateBtn: {
    flexDirection: "column",
    padding: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  deleteBtn: {
    flexDirection: "column",
    padding: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.white,
  },
});
