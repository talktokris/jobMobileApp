import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ResumeScreen from "../screens/ResumeScreen";
import ResumeSkillScreen from "../screens/ResumeSkillScreen";
import ResumeLanguageScreen from "../screens/ResumeLanguageScreen";
import ResumeEducationScreen from "../screens/ResumeEducationScreen";
import ResumeExperienceScreen from "../screens/ResumeExperienceScreen";
import ResumePersonalScreen from "../screens/ResumePersonalScreen";
import ResumeJobPreferences from "../screens/ResumeJobPreferences";
import ResumeTrainingScreen from "../screens/ResumeTrainingScreen";
import ComplitedScreen from "../screens/ComplitedScreen";

const Stack = createStackNavigator();

const ResumeNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Resume" component={ResumeScreen} />
    <Stack.Screen name="Skill" component={ResumeSkillScreen} />
    <Stack.Screen name="Language" component={ResumeLanguageScreen} />
    <Stack.Screen name="Education" component={ResumeEducationScreen} />
    <Stack.Screen name="Experience" component={ResumeExperienceScreen} />
    <Stack.Screen name="Personal Details" component={ResumePersonalScreen} />
    <Stack.Screen name="Job Preferences" component={ResumeJobPreferences} />
    <Stack.Screen name="Training" component={ResumeTrainingScreen} />
    <Stack.Screen name="Done" component={ComplitedScreen} />
  </Stack.Navigator>
);

export default ResumeNavigator;
