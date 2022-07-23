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
import settings from "../config/setting";
import useAuth from "../auth/useAuth";
import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import { ErrorMessage } from "../components/forms";

function JobsDetailScreen({ route, navigation }) {
  const listing = route.params;
  const { user, logOut } = useAuth();
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showResults, setShowResults] = React.useState(true);
  const currrentUser = user.id;

  var favDefaultName = "",
    favDefaultColor = "",
    fav = 0,
    favId = null;

  listing.get_fav_info.map((userData) => {
    //console.log(userData.user_id + "-" + currrentUser);
    if (userData.user_id == currrentUser) {
      fav = 1;
      favId = userData.id;
      // console.log("userData.user_id");
    }
  });

  if (fav == 1) {
    favDefaultName = "cards-heart";
    favDefaultColor = colors.primary;
  } else {
    favDefaultName = "cards-heart-outline";
    favDefaultColor = colors.medium;
  }
  const [iconColor, setIconColor] = useState(favDefaultColor);
  const [heartIconName, setHeartIconName] = useState(favDefaultName);

  var showBtn = 0;
  listing.get_job_apply_users.map((userData) => {
    // console.log(currrentUser + "--" + userData.user_id);

    if (userData.user_id == currrentUser) {
      showBtn = 1;
    }
  });

  const onPressIcon = () => {
    if (heartIconName == "cards-heart") {
      setHeartIconName((heartIconName) => "cards-heart-outline");
      setIconColor((iconColor) => colors.medium);
      favoriteDelete(favId);
    } else {
      setHeartIconName((heartIconName) => "cards-heart");
      setIconColor((iconColor) => colors.primary);
      efavoriteCreate(favId);
    }
  };

  async function efavoriteCreate(favId) {
    const result = await userUpdate.favoriteJobsCreate(
      currrentUser,
      listing.id
    );
    // console.log(result);
  }

  async function favoriteDelete(favId) {
    const result = await userUpdate.favoriteJobsDelete(favId);
    //console.log(result);
  }

  const applyJob = async () => {
    const result = await userUpdate.applyJobCreate(currrentUser, listing.id);

    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.status != "success") {
      setEstatus(true);
      setError(result.data.message);
      console.log(result).data;
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      //console.log(messageSend);
      setShowResults(false);
      navigation.navigate(routes.PRO_JOB_DONE, { message: messageSend });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
        <ErrorMessage error={error} visible={eStatus} />

        <View style={styles.upperContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                settings.imageUrl + "jobs/" + listing.id + "/" + listing.image,
            }}
          />
          <View style={styles.detailsInfo}>
            <AppText style={styles.title} numberOfLines={2}>
              {listing.title}
            </AppText>
            <AppText style={styles.subTitle} numberOfLines={2}>
              {listing.subTitle}
            </AppText>

            {listing.jobCategory && (
              <AppText style={styles.midTitle} numberOfLines={1}>
                <Text style={{ fontWeight: "600" }}>Category : </Text>
                {" " + listing.jobCategory}
              </AppText>
            )}

            {listing.education && (
              <AppText style={styles.midTitle} numberOfLines={1}>
                <Text style={{ fontWeight: "600" }}>Educaion : </Text>
                {" " + listing.education}
              </AppText>
            )}

            {listing.skillRequire && (
              <AppText style={styles.midTitle} numberOfLines={1}>
                <Text style={{ fontWeight: "600" }}>Skill Required : </Text>{" "}
                {" " + listing.skillRequire}
              </AppText>
            )}

            {listing.salleryMin && (
              <AppText style={styles.sallery} numberOfLines={1}>
                <Text style={{ fontWeight: "600", color: colors.medium }}>
                  Salary Min :{" "}
                </Text>
                {listing.currency + "  " + listing.salleryMin}
                <Text style={{ color: colors.medium, fontWeight: "400" }}>
                  {" "}
                  / month
                </Text>
              </AppText>
            )}
            {listing.salleryMax && (
              <AppText style={styles.sallery} numberOfLines={1}>
                <Text style={{ fontWeight: "600", color: colors.medium }}>
                  Salary Max :{" "}
                </Text>
                {listing.currency + " " + listing.salleryMax}
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
                  name="account-outline"
                  size={16}
                  color={colors.medium}
                />
                <AppText
                  style={(styles.subTitle, styles.downText)}
                  numberOfLines={1}
                >
                  {listing.vacancies + " Vacancies"}
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
                  {listing.created_at}
                </AppText>
              </View>
            </View>
          </View>

          {Object.keys(listing.get_job_specification).length >= 1 && (
            <AppText style={styles.heading}>Job Specification</AppText>
          )}
          {listing.get_job_specification.map((d, idx) => (
            <AppBulletText
              key={idx}
              title={d.title}
              iconName="circle-medium"
              scrollEnabled={false}
            />
          ))}

          {Object.keys(listing.get_job_description).length >= 1 && (
            <AppText style={styles.heading}>Job Description</AppText>
          )}
          {listing.get_job_description.map((d, idx) => (
            <AppBulletText
              key={idx}
              title={d.title}
              iconName="circle-medium"
              scrollEnabled={false}
            />
          ))}

          <View style={styles.applyBtn}>
            {(() => {
              if (showBtn == 0 || showResults == true) {
                return (
                  <AppButton
                    title="Apply Now"
                    style={{ margin: 10 }}
                    onPress={applyJob}
                  />
                );
              }

              return null;
            })()}
          </View>
        </View>
      </ScrollView>
    </>
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
    fontWeight: "800",
  },
  subTitle: {
    fontSize: 16,
    color: colors.medium,
    fontWeight: "600",
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
    fontWeight: "600",
    padding: 10,
    color: colors.secondary,
  },
  sallery: {
    fontSize: 16,
    color: colors.primary,
    paddingRight: 60,
    fontWeight: "600",
    marginVertical: 5,
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
    fontSize: 14,
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
