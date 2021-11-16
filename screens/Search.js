import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Avatar, Button, ListItem } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../firebase";
import { Ionicons } from "react-native-vector-icons";
import { NavigationContainer } from "@react-navigation/native";

export default function Search({ navigation }) {
  const [users, setUsers] = useState([]);
  const [usersFiltered, setUsersFiltered] = useState(users);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setUsersFiltered(users);
    });

    return unsubscribe;
  }, []);

  // To Search a Specific user
  const searchUser = (textToSearch) => {
    if (textToSearch.length === 0) {
      setUsersFiltered(users);
    }

    setUsersFiltered(
      users.filter((i) =>
        i.data.displayName.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
  };

  return (
    <View style={{ backgroundColor: "#121212", height: "100%", width: "100%" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ marginTop: 10, marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" color="white" size={28} />
        </TouchableOpacity>
        <View
          style={{
            padding: 10,
            backgroundColor: "#000",
            marginHorizontal: 10,
            marginTop: 10,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#000",
            flex: 1,
          }}
        >
          <TextInput
            onChangeText={(text) => searchUser(text)}
            placeholder="Find Your Buddies"
            placeholderTextColor="#e7e7e7"
            style={{ fontSize: 15, color: "white", paddingHorizontal: 5 }}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        data={usersFiltered}
        maxToRenderPerBatch={12}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <ListItem
              onPress={() =>
                navigation.navigate("FriendsProfile", {
                  id: item.id,
                  displayName: item.data.displayName,
                })
              }
              bottomDivider
              containerStyle={{ backgroundColor: "#121212" }}
            >
              <Avatar source={require("../assets/gamer.png")} size={50} />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: "white",
                  }}
                >
                  {item.data.displayName}{" "}
                  <Image
                    source={require("../assets/verified.png")}
                    style={{ height: 20, width: 20, marginLeft: 4 }}
                  />
                </ListItem.Title>
                {/* <ListItem.Subtitle style={{ color: "white" }}>
                  {/* {item.userName} */}
                {/* </ListItem.Subtitle> */}
              </ListItem.Content>
              <Button
                title="Follow"
                buttonStyle={{ backgroundColor: "#fd6220" }}
              />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const PopularUser = () => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "95%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(0,0,0,0.5)",
          marginTop: 15,
          padding: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "#202020",
            borderRadius: 100,
            width: "25%",
            height: 85,
          }}
        >
          <Image
            source={{
              uri: "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=425,format=auto/sites/default/files/styles/768x768/public/d8/images/canvas/2021/08/24/f5e9c703-e6aa-4296-8f6d-fe3abf0aa68f_6c0c23d7.jpg?itok=avdRfG1_&v=1629799688",
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            width: "75%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Akshay Kumar</Text>
            <Image
              source={require("../assets/verified.png")}
              style={{ height: 20, width: 20, marginLeft: 4 }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white" }}>
              39.5M Followers • 1.5M Crushes
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
