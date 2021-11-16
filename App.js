import React from "react";
import { StatusBar, View } from "react-native";
import Search from "./screens/Search";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import Profile from "./screens/Profile/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Splash from "./screens/Splash";
import Main from "./screens/Main/Main";
import Click from "./screens/Click";
import EditProfile from "./screens/Profile/EditProfile";
import FriendsProfile from "./screens/Profile/FriendsProfile";
import { LogBox } from "react-native";

const HomeStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MessageStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, animation: "fade" }}
      />
      <AuthStack.Screen
        name="HomeStackAuth"
        component={TabNavigator}
        options={{ headerShown: false, animation: "fade" }}
      />
      <AuthStack.Screen
        name="ProfileAuth"
        component={Profile}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, animation: "fade" }}
      />
      <ProfileStack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          animation: "fade",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
    </ProfileStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="MainScreenStack">
      <HomeStack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
        name="MainScreenStack"
        component={Main}
      />
      <HomeStack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="Search"
        component={Search}
      />
      <HomeStack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="FriendsProfile"
        component={FriendsProfile}
      />
      <HomeStack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
        name="Profile"
        component={Profile}
      />
    </HomeStack.Navigator>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View>
      <Register
        navigateToLogin={() => navigation.navigate("Login")}
        navigateToHomeScreen={() => navigation.navigate("HomeStackAuth")}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBarOptions={{
        activeTintColor: "#FD6220",
        inactiveTintColor: "#e7e7e7",
        keyboardHidesTabBar: true,
        backgroundColor: "black",
        style: {
          backgroundColor: "transparent",
          paddingHorizontal: 5,
          backgroundColor: "black",
          paddingVertical: 15,
          height: 50,
          borderTopColor: "black",
          elevation: 10,
          height: 60,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Main") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Add") {
            return focused ? (
              <Ionicons name="add-circle" size={50} color={color} />
            ) : (
              <Ionicons name="add-circle-outline" size={50} color={color} />
            );
          } else if (route.name === "Message") {
            iconName = focused ? "ios-mail" : "ios-mail-unread-outline";
          } else if (route.name === "Profile") {
            return focused ? (
              <AntDesign name="user" size={30} color={color} />
            ) : (
              <AntDesign name="user" size={30} color="white" />
            );
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarLabel: "",
      })}
    >
      <Tab.Screen
        name="Main"
        component={HomeStackScreen}
        options={{ animation: "fade" }}
      />

      <Tab.Screen
        name="Add"
        component={Click}
        options={{ animation: "fade" }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ animation: "fade" }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <RootStack.Navigator initialRouteName={"Auth"}>
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="HomeScreenMain"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ProfileAuth"
          component={Profile}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
