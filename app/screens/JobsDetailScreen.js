import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  VirtualizedView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AppBulletText from "../components/AppBulletText";
import AppButton from "../components/AppButton";

function JobsDetailScreen({ route }) {
  //  const listing = route.params;
  const listing = {
    id: 2,
    title: "Assistant Program Coordinator",
    subTitle: "D1 Lorem Ipsum is simply dummy text of the printing  ",
    vacancies: "10",
    salleryMin: "RM 3000",
    salleryMax: "RM 4000",
    jobCategory: "Administration / Officer",
    education: "Bechelor",
    skillRequire: "PHP / HTML / CSS",
    location: "Kathmandu, Nepal",
    date: "3 days ago",
    fav: 1,
    image: require("../assets/images/av.jpg"),
    jobSpecification: [
      {
        points:
          "S1 Lorem Ipsum is simply dummy text of the printing it. so we can",
      },
      { points: "S2 Lorem Ipsum is simply dummy text of the printing" },
      { points: "33 Lorem Ipsum is simply dummy text of the printing" },
      { points: "S4 Lorem Ipsum is simply dummy text of the printing" },
      { points: "S5 Lorem Ipsum is simply dummy text of the printing" },
      { points: "S6 Lorem Ipsum is simply dummy text of the printing" },
    ],
    jobDescription: [
      { points: "D1 Lorem Ipsum is simply dummy text of the printing" },
      { points: "D2 Lorem Ipsum is simply dummy text of the printing" },
      { points: "D3 Lorem Ipsum is simply dummy text of the printing" },
      { points: "D4 Lorem Ipsum is simply dummy text of the printing" },
      { points: "D5 Lorem Ipsum is simply dummy text of the printing" },
      { points: "D6 Lorem Ipsum is simply dummy text of the printing" },
    ],
  };

  var favDefaultName = "",
    favDefaultColor = "";
  if (listing.fav == 1) {
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
    <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
      <View style={styles.upperContainer}>
        <Image style={styles.image} source={listing.image} />
        <View style={styles.detailsInfo}>
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.subTitle}>{listing.subTitle}</AppText>

          {listing.jobCategory && (
            <AppText style={styles.midTitle}>
              <Text style={{ fontWeight: "800" }}>Category : </Text>
              {listing.jobCategory}
            </AppText>
          )}

          {listing.education && (
            <AppText style={styles.midTitle}>
              <Text style={{ fontWeight: "800" }}>Educaion : </Text>
              {listing.education}
            </AppText>
          )}

          {listing.skillRequire && (
            <AppText style={styles.midTitle}>
              <Text style={{ fontWeight: "800" }}>Skill Required : </Text>{" "}
              {"  " + listing.skillRequire}
            </AppText>
          )}

          {listing.salleryMin && (
            <AppText style={styles.sallery}>
              <Text style={{ fontWeight: "800", color: colors.medium }}>
                Salary Min :{" "}
              </Text>
              {"  " + listing.salleryMin}
              <Text style={{ color: colors.medium, fontWeight: "400" }}>
                {" "}
                / month
              </Text>
            </AppText>
          )}
          {listing.salleryMax && (
            <AppText style={styles.sallery}>
              <Text style={{ fontWeight: "800", color: colors.medium }}>
                Salary Max :{" "}
              </Text>
              {" " + listing.salleryMax}
              <Text style={{ color: colors.medium, fontWeight: "400" }}>
                {" "}
                / month
              </Text>
            </AppText>
          )}
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.boxBottomLeft}>
            <View style={styles.inlineIconLeft}>
              <MaterialCommunityIcons
                style={styles.iconSmall}
                name="account-supervisor"
                size={16}
                color={colors.medium}
              />
              <AppText
                style={(styles.subTitle, styles.downText)}
                numberOfLines={1}
              >
                {listing.vacancies} Vacancy
              </AppText>
            </View>
          </View>
          <View style={styles.boxBottomRight}>
            <View style={styles.inlineIconRight}>
              <TouchableOpacity style={styles.iconDiv} onPress={onPressIcon}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name={heartIconName}
                  size={25}
                  color={iconColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.boxBottomLeft}>
            <View style={styles.inlineIconLeft}>
              <MaterialCommunityIcons
                style={styles.iconSmall}
                name="map-marker-radius-outline"
                size={16}
                color={colors.medium}
              />
              <AppText
                style={(styles.subTitle, styles.downText)}
                numberOfLines={1}
              >
                {listing.location}
              </AppText>
            </View>
          </View>
          <View style={styles.boxBottomRight}>
            <View style={styles.inlineIconRight}>
              <MaterialCommunityIcons
                style={styles.iconSmall}
                name="clock-outline"
                size={16}
                color={colors.medium}
              />
              <AppText
                style={(styles.subTitle, styles.downText)}
                numberOfLines={1}
              >
                {listing.date}
              </AppText>
            </View>
          </View>
        </View>

        {Object.keys(listing.jobSpecification).length >= 1 && (
          <AppText style={styles.heading}>Job Specification</AppText>
        )}
        {listing.jobSpecification.map((d, idx) => (
          <AppBulletText
            key={idx}
            title={d.points}
            iconName="circle-medium"
            scrollEnabled={false}
          />
        ))}

        {Object.keys(listing.jobDescription).length >= 1 && (
          <AppText style={styles.heading}>Job Description</AppText>
        )}
        {listing.jobDescription.map((d, idx) => (
          <AppBulletText
            key={idx}
            title={d.points}
            iconName="circle-medium"
            scrollEnabled={false}
          />
        ))}
        <View style={styles.applyBtn}>
          <AppButton title="Apply Now" style={{ margin: 10 }} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    flexDirection: "column",
    backgroundColor: colors.grayOne,
    borderRadius: 10,
    height: "100%",
  },
  scrollView: {
    // marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsInfo: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 16,
    color: colors.medium,
    fontWeight: "800",
    marginVertical: 10,
  },
  midTitle: {
    fontSize: 16,
    color: colors.medium,
    fontWeight: "400",
    marginVertical: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "800",
    padding: 10,
    color: colors.secondary,
  },
  sallery: {
    fontSize: 18,
    color: colors.primary,
    paddingRight: 60,

    fontWeight: "800",
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
    paddingRight: 5,
  },
  downText: {
    fontSize: 16,
    color: colors.medium,
    opacity: 0.8,
  },
  iconSmall: { marginLeft: 5, paddingTop: 2, paddingRight: 5 },
  applyBtn: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default JobsDetailScreen;
