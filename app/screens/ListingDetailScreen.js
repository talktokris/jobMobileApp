import React from "react";
import { View, Image, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import colors from "../config/colors";

function ListingDetailScreen({ route }) {
  const listing = route.params;

  return (
    <View style={styles.upperContainer}>
      <Image style={styles.image} source={listing.images} />
      <View style={styles.detailsInfo}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.subTitle}>${listing.price}</AppText>
      </View>
      <ListItem
        title="Krishna Jha"
        subTitle="5 Listing"
        image={require("../assets/images/av.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: colors.grayOne,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailsInfo: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 24,
    color: colors.secondary,
    fontWeight: "800",
    marginVertical: 10,
  },
});

export default ListingDetailScreen;
