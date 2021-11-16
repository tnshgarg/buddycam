import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, SocialIcon } from "react-native-elements";
import { auth, db, storage } from "../firebase";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "react-native-vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { FileSystem } from "react-native-unimodules";
import * as ImagePicker from "expo-image-picker";
import { NavigationContainer } from "@react-navigation/native";

export default function Register(props, { navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));

  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const createUserDocument = async (user, name) => {
    await db
      .collection("users")
      .add({
        displayName: name,
        email: email,
        DOBMonth: date.getMonth() + 1,
        DOBDate: date.getDate(),
        DOBYear: date.getFullYear(),
      })

      .catch((error) => alert(error));
  };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          email: email,
        });
        createUserDocument(authUser, name);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("HomeStackAuth", {
          profileName: authUser.displayName,
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingTop: "30%",
        backgroundColor: "#121212",
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* <Image
          style={{ height: 200, resizeMode: "contain" }}
          source={require("../assets/kingdom.png")}
        /> */}

        <Image
          source={require("../assets/kingdom.png")}
          style={{ height: "35%", resizeMode: "contain" }}
        />

        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            width: "80%",
            flexDirection: "row",
            padding: 10,
            borderRadius: 20,
            marginTop: 25,
          }}
        >
          <MaterialCommunityIcons
            name="face-profile"
            color="white"
            size={25}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              color: "white",
            }}
            value={name}
            onChangeText={(nameChange) => setName(nameChange)}
            placeholderTextColor="white"
            placeholder="Enter Your Name"
            keyboardType="email-address"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            width: "80%",
            flexDirection: "row",
            padding: 10,
            borderRadius: 20,
            marginTop: 15,
          }}
        >
          <Ionicons
            name="mail"
            color="white"
            size={25}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              color: "white",
              flex: 1,
            }}
            value={email}
            onChangeText={(emailChange) => setEmail(emailChange)}
            placeholderTextColor="white"
            placeholder="Enter Email"
            keyboardType="email-address"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            width: "80%",
            flexDirection: "row",
            borderRadius: 20,
            padding: 10,
            marginTop: 15,
          }}
        >
          <Ionicons
            name="md-lock-closed"
            color="white"
            size={25}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              color: "white",
            }}
            value={password}
            onChangeText={(passwordChange) => setPassword(passwordChange)}
            placeholderTextColor="white"
            secureTextEntry={true}
            placeholder="Create Password"
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            borderWidth: 1,
            borderColor: "white",
            flexDirection: "row",
            borderRadius: 20,
            alignItems: "center",
            padding: 10,
            marginTop: 15,
          }}
          onPress={() => setShow(!show)}
        >
          <MaterialIcons
            name="date-range"
            size={25}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white" }}>
            {date.getDate() +
              " " +
              (date.getMonth() + 1) +
              " " +
              date.getFullYear()}
          </Text>
        </TouchableOpacity>
        <Button
          title="Create Account"
          containerStyle={{ width: "80%", marginTop: 20 }}
          onPress={register}
          buttonStyle={{
            backgroundColor: "#FD6220",
            height: 70,
            borderRadius: 15,
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 15 }}>
            Already a user ?{"  "}
          </Text>
          <Text
            style={{ color: "#FD6220", fontSize: 15 }}
            onPress={props.navigateToLogin}
          >
            Sign in
          </Text>
        </View>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
