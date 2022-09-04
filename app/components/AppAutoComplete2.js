import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import colors from "../config/colors";
import fonts from "../config/fonts";

// Note: must have:   { id: 1, title: "Java", }
function AppAutoComplete({
  dataSet = {},
  apiLink = "https://jsonplaceholder.typicode.com/todos/",
  lebel,
  placeHolderText,
  width = "100%",
  ...otherProps
}) {
  const [MainJSON, setMainJSON] = useState(dataSet);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (Object.keys(dataSet).length === 0) {
      fetch(apiLink)
        .then((res) => res.json())
        .then((json) => {
          // var as = json2array(json);
          setMainJSON(json);
        })
        .catch((e) => {
          alert(e);
        });
    }
  }, []);

  return (
    <>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        inputContainerStyle={(styles.textInput, styles.autoComText)}
        closeOnSubmit={true}
        initialValue={{ id: "2" }} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={MainJSON}
        textInputProps={{ placeholder: placeHolderText }}
        renderItem={selectedItem}
        {...otherProps}
      />
      <TextInput
        placeholderTextColor={colors.medium}
        style={styles.textInput}
        value="Hi"
        {...otherProps}
      />
      <Text style={{ color: "#668", fontSize: 13 }}>
        Selected item id: {JSON.stringify(selectedItem)}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    color: colors.medium,
  },
  textInput: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.dark,
  },
  icon: {
    marginRight: 10,
    padding: Platform.OS === "android" ? 7 : 5,
  },
  autoComText: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingTop: 7,
    paddingLeft: 5,
    paddingBottom: 7,
  },
});

export default AppAutoComplete;
