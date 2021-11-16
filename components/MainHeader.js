import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "react-native-vector-icons";
import { Avatar } from "react-native-elements";

export default function MainHeader(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        paddingTop: 10,
        backgroundColor: "black",
        borderBottomColor: "#302f2f",
        borderBottomWidth: 1,
        backgroundColor: "#000",
      }}
    >
      <View>
        <TouchableOpacity style={{ marginTop: 0, marginLeft: 5 }}>
          <Avatar source={require("../assets/tony.jpg")} size={30} rounded />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
          flex: 1,
        }}
      >
        <Image
          style={{
            width: 120,
            height: 25,
            resizeMode: "contain",
          }}
          source={require("../assets/logo.png")}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{ marginTop: 0, marginRight: 5 }}
          onPress={props.navigateToSearch}
        >
          <Ionicons name="md-rocket-outline" size={26} color="#ffe" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
