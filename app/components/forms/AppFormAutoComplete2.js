import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import AppAutoComplete from "../AppAutoComplete";

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
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormAutoComplete;
