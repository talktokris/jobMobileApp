import React from "react";
import { useFormikContext } from "formik";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import ErrorMessage from "./ErrorMessage";
import AppAutoComplete from "../AppAutoComplete";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import colors from "../../config/colors";
import fonts from "../../config/fonts";

function AppFormAutoComplete({
  name,
  width,
  dataSet,
  apiLink,
  lebel,
  placeHolderText,
  zIndex,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <View style={[styles.section]}>
        <Text style={styles.sectionTitle}>Second</Text>
        <AutocompleteDropdown
          id="foreignCountry"
          className="country-select"
          name="skillName"
          options={[
            { id: "1", title: "Alpha" },
            { id: "2", title: "Beta" },
            { id: "3", title: "Gamma" },
            { id: "4", title: "Delta" },
            { id: "5", title: "Heja" },
            { id: "6", title: "Kaka" },
          ]}
          getOptionLabel={(option) => option.label}
          defaultValue={values.title}
          onChange={(e, title) => {
            console.log(title);
            setFieldValue("skillName", title);
          }}
          renderInput={(params) => (
            <Field
              component={TextField}
              {...params}
              name="country"
              label="Country"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <AutocompleteDropdown
          bnBlue={() => setFieldTouched(name)}
          setFieldValue="hi"
          width={width}
          placeHolderText={placeHolderText}
          {...otherProps}
          zIndex={5}
          dataSet={[
            { id: "1", title: "Alpha" },
            { id: "2", title: "Beta" },
            { id: "3", title: "Gamma" },
            { id: "4", title: "Delta" },
            { id: "5", title: "Heja" },
            { id: "6", title: "Kaka" },
          ]}
        />
      </View>
      {/*
      <AppAutoComplete
        dataSet={dataSet}
        apiLink={apiLink}
        //autoCapitalize="none"
        // autoCorrect={false}
        // icon="email"
        // keyboardType="email-address"
        bnBlue={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        placeHolderText={placeHolderText}
        {...otherProps}
        //  placeholder="Email"
        // textContentType="emailAddress"
        /> */}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 150,
    height: 110,
    alignSelf: "center",
    margin: 30,
    marginTop: 50,
  },
  autoComText: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
});
export default AppFormAutoComplete;
