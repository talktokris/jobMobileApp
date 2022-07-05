import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import JobsListItem from "../components/JobsListItem";
import Screen from "../components/Screen";
import Separater from "../components/Separater";
const messages = [
  {
    id: 1,
    title: "Assistant Program Coordinator",
    subTitle: "Everent Pvt Ltd ",
    sallery: "RM 3000",
    location: "Kathmandu, Nepal",
    date: "3 days ago",
    fav: 1,
    image: require("../assets/images/av.jpg"),
  },
  {
    id: 2,
    title: "Assistant Program Coordinator",
    subTitle:
      "D1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
    sallery: "RM 3000",
    location: "Kathmandu, Nepal",
    date: "3 days ago",
    fav: 0,
    image: require("../assets/images/av.jpg"),
  },
  {
    id: 3,
    title: "Assistant Program Coordinator",
    subTitle:
      "D1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
    sallery: "RM 3000",
    location: "Kathmandu, Nepal",
    date: "3 days ago",
    fav: 1,
    image: require("../assets/images/av.jpg"),
  },
];

function JobslistScreen(props) {
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <JobsListItem
            title={item.title}
            subTitle={item.subTitle}
            sallery={item.sallery}
            image={item.image}
            location={item.location}
            date={item.date}
            fav={item.fav}
            onPress={() => console.log("Message Selected:- " + item.id)}
            renderRightActions={() => (
              <View style={{ backgroundColor: "red", height: 70 }}></View>
            )}
          />
        )}
        ItemSeparatorComponent={Separater}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({});

export default JobslistScreen;
