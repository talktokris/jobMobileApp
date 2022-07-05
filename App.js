import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import JobsDetailScreen from "./app/screens/JobsDetailScreen";
import JobslistScreen from "./app/screens/JobslistScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  return <JobsDetailScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
