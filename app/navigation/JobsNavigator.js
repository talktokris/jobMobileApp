import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobsListScreen from "../screens/JobsListScreen";
import JobsDetailScreen from "../screens/JobsDetailScreen";
import JobsFavoriteScreen from "../screens/JobsFavoriteScreen";

const Stack = createStackNavigator();

const JobsNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Jobs" component={JobsListScreen} />
    <Stack.Screen name="Jobs Details" component={JobsDetailScreen} />
    <Stack.Screen name="Jobs Favorite" component={JobsFavoriteScreen} />
  </Stack.Navigator>
);

export default JobsNavigator;
