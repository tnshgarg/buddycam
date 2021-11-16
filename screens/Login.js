import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import { auth } from "../firebase";
import { Ionicons } from "react-native-vector-icons";
import firebase from "firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingTop: "30%",
        backgroundColor: "#121212",
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ height: "35%", resizeMode: "contain" }}
          source={require("../assets/cherry.png")}
        />
        <Text style={{ color: "white", fontSize: 17, marginTop: 10 }}>
          Find Your Lovely Buddies Online
        </Text>
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
          <Ionicons
            name="mail"
            color="white"
            size={25}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              color: "white",
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
            placeholder="Enter Password"
          />
        </View>
        <Button
          title="Sign In"
          containerStyle={{ width: "80%", marginTop: 20 }}
          buttonStyle={{
            backgroundColor: "#FD6220",
            height: 70,
            borderRadius: 10,
          }}
          onPress={login}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 15 }}>
            Create an Account ?{"  "}
          </Text>
          <Text
            style={{ color: "#FD6220", fontSize: 15 }}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </View>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
