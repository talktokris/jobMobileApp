import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";
import AppText from "./AppText";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={25}
              style={styles.icon}
              color={colors.medium}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.lebel}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={25}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                lebel={item.lebel}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    width: "100%",
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  textInput: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.dark,
  },
  text: {
    flex: 1,
    color: colors.medium,
  },
  placeholder: { color: colors.medium, flex: 1 },
  icon: {
    marginRight: 10,
  },
});

export default AppPicker;
