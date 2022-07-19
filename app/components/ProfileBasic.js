import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ProfileBasic({
  name,
  email,
  emailStatus,
  mobileNo,
  mobileStatus,
  country,
  profileType,
  image,
  onPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
      </View>
      <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
        <View style={styles.camraButton}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="camera-flip-outline"
            size={23}
            color={colors.primary}
          />
        </View>
      </TouchableHighlight>
      <View style={styles.appTextContainer}>
        <AppText
          style={
            (styles.title,
            { fontWeight: "800", fontSize: 18, color: colors.primary })
          }
          numberOfLines={2}
        >
          {name}
        </AppText>
        <View style={styles.inlineAppText}>
          <AppText
            style={
              (styles.title,
              { fontWeight: "800", fontSize: 16, color: colors.medium })
            }
            numberOfLines={2}
          >
            {email}
          </AppText>
          {emailStatus == "Verified" && (
            <AppText style={(styles.title, styles.greenText)} numberOfLines={1}>
              {emailStatus}
            </AppText>
          )}
          {emailStatus == "Not Verified" && (
            <AppText style={(styles.title, styles.redText)} numberOfLines={1}>
              {emailStatus}
            </AppText>
          )}
        </View>
        {mobileNo && (
          <View style={styles.inlineAppText}>
            <AppText style={styles.title} numberOfLines={1}>
              {mobileNo}
            </AppText>
            {mobileStatus == "Verified" && (
              <AppText
                style={(styles.title, styles.greenText)}
                numberOfLines={1}
              >
                {mobileStatus}
              </AppText>
            )}
            {mobileStatus == "Not Verified" && (
              <AppText style={(styles.title, styles.redText)} numberOfLines={1}>
                {mobileStatus}
              </AppText>
            )}
          </View>
        )}

        {country && (
          <AppText style={styles.subTitle} numberOfLines={2}>
            {country}
          </AppText>
        )}
        {profileType && (
          <AppText
            style={(styles.subTitle, { paddingTop: 5, fontSize: 16 })}
            numberOfLines={1}
          >
            {profileType}
          </AppText>
        )}
      </View>
    </View>
  );
}

export default ProfileBasic;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.white,

    alignItems: "center",
  },
  appTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 104,
    width: 104,
    borderRadius: 52,
    bottom: 10,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 14,
    color: colors.medium,
  },
  inlineAppText: {
    flexDirection: "row",
    alignItems: "center",
  },
  redText: {
    color: colors.primary,
    fontWeight: "900",
    paddingLeft: 10,
    fontSize: 12,
  },
  greenText: {
    color: colors.secondary,
    fontWeight: "900",
    paddingLeft: 10,
    fontSize: 12,
  },
  camraButton: {
    position: "absolute",
    height: 36,
    width: 36,
    borderRadius: 18,
    zIndex: 2,
    bottom: -60,
    left: -40,
    borderColor: colors.grayOne,
    borderWidth: 2,

    backgroundColor: colors.white,
  },
  icon: {
    padding: 4,
  },
});
