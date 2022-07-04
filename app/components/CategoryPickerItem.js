import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import AppText from "./AppText";

import Icon from "./Icon";

function CategoryPickerItem({ item, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={50}
        />
        <AppText style={styles.label}>{item.lebel}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    fontSize: 17,
  },
});
export default CategoryPickerItem;
