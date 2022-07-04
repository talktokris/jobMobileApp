import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItem({ title, subTitle, iconComponent, image, onPress }) {
  return (
    <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
      <View style={styles.container}>
        {iconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.appTextContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
        </View>
        <MaterialCommunityIcons
          style={styles.icon}
          name="chevron-right"
          size={25}
          color={colors.medium}
        />
      </View>
    </TouchableHighlight>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,

    alignItems: "center",
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
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 16,
    color: colors.medium,
  },
});
