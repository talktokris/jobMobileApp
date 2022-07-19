import { LogBox } from "react-native";
import ignoreWarnings from "ignore-warnings";

ignoreWarnings("warn", ["ViewPropTypes", "[react-native-gesture-handler]"]);

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  "NativeBase: The contrast ratio of",
  "expo-app-loading is deprecated in favor of expo-splash-screen",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
