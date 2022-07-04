import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import AppTextInput from "../AppTextInput";

function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <AppTextInput
        //autoCapitalize="none"
        // autoCorrect={false}
        // icon="email"
        // keyboardType="email-address"
        bnBlue={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
        //  placeholder="Email"
        // textContentType="emailAddress"
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
