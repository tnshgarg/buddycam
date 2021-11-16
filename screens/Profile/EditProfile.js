import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Button } from "react-native-elements";
import { MaterialIcons } from "react-native-vector-icons";

export default function EditProfile() {
  const [image, setImage] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
        width: "100%",
        backgroundColor: "#000",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ alignItems: "center", marginTop: 5 }}
        onPress={PickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ height: 200, width: 200, borderRadius: 400 }}
          />
        ) : (
          <Image
            source={require("../../assets/gamer.png")}
            style={{ height: 200, width: 200, borderRadius: 400 }}
          />
        )}

        <MaterialIcons
          name="edit"
          color="white"
          size={45}
          style={{ position: "absolute", right: 0, top: 0 }}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#202020",
          padding: 10,
          marginTop: 15,
          width: "90%",
          borderBottomColor: "white",
          borderBottomWidth: 2,
        }}
      >
        <TextInput
          placeholder="Enter Your Display Name"
          placeholderTextColor="white"
          style={{ color: "white" }}
          value={displayName}
          onChangeText={(val) => setDisplayName(val)}
        />
      </View>
      <View
        style={{
          backgroundColor: "#202020",
          padding: 10,
          marginTop: 15,
          width: "90%",
          borderBottomColor: "white",
          borderBottomWidth: 2,
          height: 100,
        }}
      >
        <TextInput
          placeholder="Enter Your Bio"
          placeholderTextColor="white"
          style={{ color: "white" }}
          numberOfLines={5}
          multiline
          maxLength={140}
          value={bio}
          onChangeText={(val) => setBio(val)}
        />
      </View>
      <View style={{ width: "100%", paddingRight: 25 }}>
        <Text
          style={{
            color: "gray",
            fontSize: 14,
            width: "100%",
            textAlign: "right",
          }}
        >
          Max Length: 140 characters
        </Text>
      </View>
      <Button
        containerStyle={{ marginTop: 15, width: "90%" }}
        buttonStyle={{ backgroundColor: "#fd6220" }}
        title="Save Settings"
      />
    </ScrollView>
  );
}
