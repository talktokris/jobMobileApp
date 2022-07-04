import React from "react";

//import { ImageBackground, StyleSheet,View } from "react-native";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

//import React, {useState, Component, ImageBackground} from 'react';
import AppText from "../components/AppText"; // Standered StyleSheet
import AppButton from "../components/AppButton"; // Standered StyleSheet
import colors from "../config/colors";
import fonts from "../config/fonts";
import Constants from "expo-constants";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      blurRadius={10}
      source={require("../assets/images/bg.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.tagLine}>Your Seach End Here</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
    marginBottom: "20%",
  },
  logo: {
    width: 160,
    height: 110,
    // resizeMode: "center",
  },
  tagLine: {
    fontSize: 20,
    fontWeight: "800",
    paddingVertical: 20,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
  },
});

export default WelcomeScreen;
