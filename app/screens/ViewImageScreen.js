import React from "react";
import { View, Image, StyleSheet } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.deleteContainer}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={35}
          color="white"
        />
      </View>
      <View style={styles.closeContainer}>
        <MaterialCommunityIcons name="close-thick" size={35} color="white" />
      </View>

      <Image
        style={styles.image}
        source={require("../assets/images/img4.jpg")}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    padding: 5,
    flexDirection: "row",
  },
  deleteContainer: {
    left: 20,

    top: 50,
    position: "absolute",
  },
  closeContainer: {
    top: 50,
    position: "absolute",
    right: 20,
  },
});

export default ViewImageScreen;
