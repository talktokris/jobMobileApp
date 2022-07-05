import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function JobsListItem({
  title,
  subTitle,
  sallery,
  iconComponent,
  image,
  location,
  date,
  fav,
  onPress,
}) {
  var favDefaultName = "",
    favDefaultColor = "";
  if (fav == 1) {
    favDefaultName = "cards-heart";
    favDefaultColor = colors.primary;
  } else {
    favDefaultName = "cards-heart-outline";
    favDefaultColor = colors.medium;
  }
  const [iconColor, setIconColor] = useState(favDefaultColor);
  const [heartIconName, setHeartIconName] = useState(favDefaultName);

  const onPressIcon = () => {
    if (heartIconName == "cards-heart") {
      setHeartIconName((heartIconName) => "cards-heart-outline");
      setIconColor((iconColor) => colors.medium);
    } else {
      setHeartIconName((heartIconName) => "cards-heart");
      setIconColor((iconColor) => colors.primary);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
          <View style={styles.content}>
            {iconComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.appTextContainer}>
              <AppText style={styles.title} numberOfLines={2}>
                {title}
              </AppText>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={1}>
                  {subTitle}
                </AppText>
              )}

              {sallery && (
                <AppText style={styles.sallery} numberOfLines={1}>
                  {sallery}
                </AppText>
              )}
            </View>
          </View>
        </TouchableHighlight>
        <TouchableOpacity style={styles.iconDiv} onPress={onPressIcon}>
          <MaterialCommunityIcons
            style={styles.icon}
            name={heartIconName}
            size={25}
            color={iconColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.boxBottomLeft}>
          <View style={styles.inlineIconLeft}>
            <MaterialCommunityIcons
              style={styles.iconSmall}
              name="map-marker-radius-outline"
              size={14}
              color={colors.medium}
            />
            <AppText
              style={(styles.subTitle, styles.downText)}
              numberOfLines={1}
            >
              {location}
            </AppText>
          </View>
        </View>
        <View style={styles.boxBottomRight}>
          <View style={styles.inlineIconRight}>
            <MaterialCommunityIcons
              style={styles.iconSmall}
              name="clock-outline"
              size={14}
              color={colors.medium}
            />
            <AppText
              style={(styles.subTitle, styles.downText)}
              numberOfLines={1}
            >
              {date}
            </AppText>
          </View>
        </View>
      </View>
    </>
  );
}

export default JobsListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    width: "65%",
    paddingLeft: 10,

    paddingTop: 10,
  },
  appTextContainer: {
    width: "100%",
    marginLeft: 5,
    justifyContent: "center",
  },
  image: {
    flexDirection: "row",
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  subTitle: {
    fontSize: 16,
    color: colors.medium,
  },
  sallery: {
    fontSize: 18,
    color: colors.primary,

    fontWeight: "800",
  },
  iconDiv: {
    padding: 5,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  containerBottom: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //  borderTopColor: colors.grayOne,
    // borderTopWidth: 1,
  },
  boxBottomLeft: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 5,
  },
  boxBottomRight: {
    flex: 1,
    textAlign: "right",
    justifyContent: "flex-end",

    padding: 5,
  },
  inlineIconLeft: {
    flexDirection: "row",
  },
  inlineIconRight: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  downText: {
    fontSize: 12,
    color: colors.medium,
    opacity: 0.8,
  },
  iconSmall: { marginLeft: 5, paddingTop: 2, paddingRight: 5 },
});
