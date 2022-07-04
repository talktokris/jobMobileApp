import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import Separater from "../components/Separater";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listing",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "Messages",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/images/av.jpg")}
        />
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                iconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
            ItemSeparatorComponent={Separater}
          />
        </View>
        <ListItem
          title="Logout"
          iconComponent={
            <Icon
              name="logout"
              size={45}
              backgroundColor="#ffe66d"
              iconColor="white"
            />
          }
          onPress={() => logOut()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.lightGray },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
