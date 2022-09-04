import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";

function ListingScreen({ navigation }) {
  const getListingsAPi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsAPi.request();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  // registerForPushNotificationsAsync();

  return (
    <>
      <ActivityIndicator visible={getListingsAPi.loading} />
      <Screen style={styles.screen}>
        {getListingsAPi.error && (
          <>
            <View style={styles.retryView}>
              <AppText style={{ textAlign: "center" }}>
                Couldn't retrieve the listings.
              </AppText>
              <AppButton title="Retry" onPress={getListingsAPi.request} />
            </View>
          </>
        )}

        <FlatList
          data={getListingsAPi.data}
          keyExtractor={(Listing) => Listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$ " + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.lightGray,
  },
  retryView: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
});
export default ListingScreen;
