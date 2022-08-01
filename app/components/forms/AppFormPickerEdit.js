import React from "react";
import { useFormikContext } from "formik";

import AppPickerEdit from "../AppPickerEdit";
import ErrorMessage from "./ErrorMessage";

function AppFormPickerEdit({
  items,
  name,
  lebel,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
  ...otherProps
}) {
  const { errors, setFieldValue, selectedItem, touched, values } =
    useFormikContext();
  return (
    <>
      <AppPickerEdit
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        lebel={lebel}
        // selectedItem={selectedItem}
        selectedItem={values[name]}
        // selectedItem={{ id: 48, title: values[name] }}
        bnBlue={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPickerEdit;
