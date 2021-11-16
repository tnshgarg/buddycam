import React, { createRef, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "react-native-vector-icons";
import { auth, db, storage } from "../firebase";
import FastImage from "react-native-fast-image";
import * as Contacts from "expo-contacts";

export default function Click({ navigation }) {
  const [image, setImage] = useState(null);
  const [postURL, setPostURL] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loadingText, setLoadingText] = useState("Uploading...");

  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.7,
      allowsMultipleSelection: true,
      size: 5,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      uploadImageToBucket(result.uri).then(() => {
        setDisabled(false);
        setLoadingText("");
      });
    }
  };

  const accessContacts = async () => {
    console.log("KK");
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.7,
    });
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImageToBucket(result.uri).then(() => {
        setDisabled(false);
        setLoadingText("");
      });
    }
  };

  // React.useEffect(() => {
  //   openCamera();
  // }, [])

  const createPost = async () => {
    await db
      .collection("images")
      .add({
        imageUrl: mainImageUrl,
        displayName: displayName,
        postDesc: postDescription.replace(/\s+/g, " ").trim(),
        timestamp: new Date().toLocaleDateString(),
      })
      .then(() => {
        navigation.navigate("Main", { url: mainImageUrl });
        setMainImageUrl(null);
        setPostDescription("");
        setDisabled(true);
        setImage(null);
        setLoadingText("Uploading...");
      })
      .catch((error) => alert(error));
  };
  const createMyPost = async () => {
    await db
      .collection("myImages")
      .add({
        imageUrl: mainImageUrl,
      })
      .catch((error) => alert(error));
  };

  const uploadImageToBucket = async (uri) => {
    const uploadUri = uri;
    const fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const extension = fileName.split(".").pop();
    const name = fileName.split(".").slice(0, -1).join(".");
    let randItem = fileName + name + Date.now() + "." + extension;
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = storage.ref().child("images/" + randItem);
    return ref.put(blob).then(async () => {
      const url = await storage
        .ref("images/" + randItem)
        .getDownloadURL()
        .then((url) => setMainImageUrl(url));
      // navigation.navigate("Main", { url: url });
    });
  };

  // useEffect(() => {
  //   const Auth = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setDisplayName(user.displayName);
  //     }
  //   });
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#000",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {image && (
          <View style={{ width: "50%", height: 250, marginTop: 40 }}>
            <Image
              source={{
                uri: image,
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
                aspectRatio: 9 / 16,
                // opacity: 0.5,
              }}
            />

            <Text
              style={{
                position: "absolute",
                top: "45%",
                left: "20%",
                color: "white",
              }}
            >
              {loadingText}
            </Text>
          </View>
        )}

        <Button
          containerStyle={{ marginTop: 25 }}
          buttonStyle={{
            backgroundColor: "#fd6220",
            borderRadius: 80,
            padding: 15,
            elevation: 50,
          }}
          icon={<Ionicons name="md-file-tray" color="white" size={30} />}
          onPress={() => {
            PickImage();
          }}
        />
        <Button
          containerStyle={{ marginTop: 25 }}
          buttonStyle={{
            backgroundColor: "#fd6220",
            borderRadius: 80,
            padding: 15,
            elevation: 50,
          }}
          icon={<Ionicons name="camera" color="white" size={30} />}
          onPress={() => {
            openCamera();
          }}
        />
      </View>

      <View
        style={{
          height: 200,
          width: "90%",
          paddingHorizontal: 25,
          alignItems: "baseline",
          padding: 10,
          borderRadius: 10,
          marginTop: 25,
          backgroundColor: "#202020",
        }}
      >
        <TextInput
          placeholder="Write a Post Description"
          placeholderTextColor="white"
          multiline
          autoFocus
          value={postDescription}
          onChangeText={(val) => setPostDescription(val)}
          maxLength={100}
          style={{
            width: "100%",
            alignItems: "baseline",
            textAlign: "left",
            color: "white",
          }}
        />
      </View>
      <Button
        onPress={() => createPost().then(() => createMyPost())}
        disabled={disabled}
        disabledStyle={{ backgroundColor: "gray" }}
        containerStyle={{
          borderRadius: 10,
          marginTop: 25,
          width: "90%",
          marginHorizontal: 15,
        }}
        buttonStyle={{ backgroundColor: "#fd6220" }}
        title="Post"
        icon={
          <FontAwesome
            name="send"
            size={25}
            color="white"
            style={{ marginRight: 10 }}
          />
        }
      />
    </ScrollView>
  );
}
