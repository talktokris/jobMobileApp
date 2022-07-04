import React, { useState, useEffect } from "react";
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
/*
const Listings = [
  {
    id: 1,
    title: "Fist Item One",
    subTitle: "50",
    image: require("../assets/images/img1.jpg"),
  },
  {
    id: 2,
    title: "Fist Item Two",
    subTitle: "230",
    image: require("../assets/images/img2.jpg"),
  },
  {
    id: 3,
    title: "Fist Item Three",
    subTitle: "250",
    image: require("../assets/images/img3.jpg"),
  },
  {
    id: 4,
    title: "Fist Item Four",
    subTitle: "100",
    image: require("../assets/images/img4.jpg"),
  },
];
*/
function ListingScreen({ navigation }) {
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <View style={styles.retryView}>
            <AppText style={{ textAlign: "center" }}>
              Couldn't retrieve the listings.
            </AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </View>
        </>
      )}

      <ActivityIndicator visible={loading} />
      <FlatList
        data={listings}
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
