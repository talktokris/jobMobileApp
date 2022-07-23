import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import Separater from "../components/Separater";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";
import setting from "../config/setting";
import ListItemProfile from "../components/ListItemProfile";

const menuItems = [
  {
    title: "Favorite Jobs",
    icon: {
      name: "cards-heart-outline",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.JOB_FAV_LIST,
  },
  {
    title: "Jobs Applied",
    icon: {
      name: "checkbox-marked-outline",
      backgroundColor: "orange",
    },
    targetScreen: routes.JOB_APL_LIST,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.AC_MESAGES,
  },
];

function AccountScreen({ route, navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItemProfile
          title={user.name}
          subTitle={user.email}
          //image={require("../assets/images/av.jpg")}
          imgStatus={user.image}
          image={setting.imageUrl + "members/" + user.id + "/" + user.image}
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 104,
    width: 104,
    borderRadius: 52,
    bottom: 10,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 5,
  },
});

export default AccountScreen;
