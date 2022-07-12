import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppDatePicker from "./app/components/AppDatePicker";

import JobsDetailScreen from "./app/screens/JobsDetailScreen";
import JobslistScreen from "./app/screens/JobslistScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ResumeEducationScreen from "./app/screens/ResumeEducationScreen";
import ResumeExperienceScreen from "./app/screens/ResumeExperienceScreen";
import ResumeLanguageScreen from "./app/screens/ResumeLanguageScreen";
import ResumeScreen from "./app/screens/ResumeScreen";
import ResumeSkillScreen from "./app/screens/ResumeSkillScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  return <ResumeSkillScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
