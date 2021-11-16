import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import UserProfileImages from "../../components/UserProfileImages";
import UserProfileMain from "../../components/UserProfileMain";
import { Feather, Ionicons, FontAwesome5 } from "react-native-vector-icons";
import { SpeedDial } from "react-native-elements";
import { auth } from "../../firebase";

export default function FriendsProfile({ navigation, route }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ backgroundColor: "#000" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{
            marginRight: 12,
            backgroundColor: "#302f2f",
            borderRadius: 25,
            padding: 5,
            position: "absolute",
            top: 15,
            left: 15,
            zIndex: 100,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" color="white" size={26} />
        </TouchableOpacity>
        <UserProfileMain
          userName={route.params.displayName}
          navigateToEditProfile={() => navigation.navigate("Edit Profile")}
        />
        <UserProfileImages />
      </ScrollView>
      <SpeedDial
        isOpen={open}
        icon={<Feather name="settings" size={24} color="white" />}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color="#FD6220"
      >
        <SpeedDial.Action
          icon={<FontAwesome5 name="user-cog" size={20} color="white" />}
          title="User Settings"
          color="#1da1f0"
        />
      </SpeedDial>
    </View>
  );
}
