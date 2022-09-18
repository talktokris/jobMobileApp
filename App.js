import React, { useState } from "react";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import "./app/config/ignoreWarnings";
//console.disableYellowBox = true;
import { Button, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

//import Screen from "./app/components/Screen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

const Stack = createStackNavigator();


export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
  //  <AppNavigator />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#fff',
  },
});
