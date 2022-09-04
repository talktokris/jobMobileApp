import React, { useState } from "react";
import { StyleSheet, Platform, SafeAreaView } from "react-native";
import DatePicker from "react-native-datepicker";

//import moment from "moment";
//moment().format();

import colors from "../config/colors";
import fonts from "../config/fonts";

function AppDatePicker({ width = "100%", ...otherProps }) {
  const [date, setDate] = useState("");
  return (
    <>
      <SafeAreaView>
        <DatePicker
          style={[styles.container, { width: width }]}
          date={date} //initial date from state
          {...otherProps}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 8,
    marginVertical: 10,
    width: "100%",
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
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.medium,
  },
  dateInput: {
    borderColor: "#f8f4f4",
  },
});

export default AppDatePicker;
