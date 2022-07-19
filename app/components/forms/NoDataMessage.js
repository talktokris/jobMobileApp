import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function NoDataMessage({ title }) {
  return (
    <View style={styles.emptyListStyle}>
      <AppText style={styles.emptyMessageStyle}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListStyle: {
    flex: 1,
    justifyContent: "center",
  },
  emptyMessageStyle: {
    textAlign: "center",
    color: colors.primary,
  },
});
export default NoDataMessage;
