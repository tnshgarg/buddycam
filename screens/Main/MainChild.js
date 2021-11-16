import React, { createRef, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Share,
  Alert,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
import LottieView from "lottie-react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ActionSheet from "react-native-actions-sheet";
import { captureRef } from "react-native-view-shot";

import { auth, db } from "../../firebase";
import { FileSystem } from "react-native-unimodules";

let lastTap;
export default function MainChild({
  imageProp,
  description,
  displayName,
  timestamp,
  identity,
}) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [input, setInput] = React.useState("");
  const [image, setImage] = React.useState(
    "https://static.wikia.nocookie.net/spiderman-films/images/1/1d/Spider-Man_MCU.jpg/revision/latest/scale-to-width-down/250?cb=20200313204650"
  );
  const [desc, setDesc] = React.useState(
    "Can I beat Minecraft while my 3 friends try to hunt me down."
  );
  const viewRef = useRef();
  const [loveAnimation, setLoveAnimation] = React.useState(false);
  const animation = React.useRef(null);
  const loveAnime = React.useRef(null);
  const isFirstRun = React.useRef(true);
  const [comments, setComments] = useState([]);

  lastTap = null;
  function handleDoubleTap() {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setIsLiked(true);
      animation.current.play(0, 40);
    } else {
      lastTap = now;
    }
  }

  const convert = async (imag) => {
    const base64 = await FileSystem.readAsStringAsync(imag, {
      encoding: "base64",
    });
  };

  const actionSheetRef = createRef();
  const customImg = [
    "https://i.pinimg.com/564x/bd/2c/f1/bd2cf1a46c87b84d5413e496f3293dd9.jpg",
    "https://i.pinimg.com/564x/ea/f5/9f/eaf59fe3a827b12d283a34139facff17.jpg",
    "https://i.pinimg.com/564x/a5/7b/bf/a57bbfd6cb909acd24226bfe99875d87.jpg",
  ];

  // const shareMessage = () => {
  //   Share.share({
  //     message: imageProp,
  //     title: desc,
  //   })
  // };

  const shareImage = async () => {
    try {
      await Share.share({
        url: imageProp,
        message: description + " from " + displayName,
      });
    } catch (err) {
      Alert.alert(err);
    }
  };

  const sendMessage = () => {
    db.collection("images").doc(identity).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("images")
      .doc(identity)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        animation.current.play(40, 40);
      }
      isFirstRun.current = false;
    } else if (isLiked) {
      animation.current.play(0, 40);
    }
  }, [isLiked]);

  return (
    <TouchableWithoutFeedback
      ref={viewRef}
      onPress={handleDoubleTap}
      style={{
        height: Dimensions.get("window").height - 119.65,
        width: "100%",
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
          source={{ uri: imageProp }}
        />
        {/* <ImagesSwiper
          images={customImg}
          autoplay={true}
          showsPagination={true}
          autoplayTimeout={2.5}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height - 119.65}
        /> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          justifyContent: "center",
          backgroundColor: "rgba(18,18,18,0.89)",
          bottom: 0,
          paddingVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <View>
          <Avatar
            rounded
            size={60}
            source={require("../../assets/gamer.png")}
            onPress={() => convert(imageProp)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: "white", fontSize: 16, marginLeft: 10 }}
            numberOfLines={2}
          >
            {description}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#f5f5f5", fontSize: 12, marginLeft: 10 }}>
              {displayName} •
            </Text>
            <Text style={{ color: "#f5f5f5", fontSize: 12, marginLeft: 5 }}>
              {timestamp}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          right: 10,
          alignItems: "center",
          top: "42%",
        }}
      >
        {!isLiked ? (
          <TouchableOpacity
            onPress={() => setIsLiked(!isLiked)}
            style={{
              marginBottom: 12,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 5,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons name="heart" color="white" size={40} />
            <Text
              style={{
                color: "white",
                marginTop: 3,
              }}
            >
              10.2M
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsLiked(!isLiked)}
            style={{
              marginBottom: 12,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 5,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons name="heart" color="red" size={40} />
            <Text
              style={{
                color: "white",
                marginTop: 3,
              }}
            >
              10.2M
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => actionSheetRef.current?.setModalVisible()}
          style={{
            marginBottom: 8,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <MaterialCommunityIcons
            name="comment-outline"
            color="white"
            size={40}
          />
          <Text
            style={{
              color: "white",
              marginTop: 5,
            }}
          >
            11K
          </Text>
        </TouchableOpacity>

        <ActionSheet
          openAnimationSpeed={15}
          bounceOnOpen="true"
          ref={actionSheetRef}
          closeAnimationDuration="500"
          elevation={3}
          keyboardDismissMode="interactive"
          containerStyle={{
            height: "100%",
            backgroundColor: "#121212",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={{
              width: "100%",
              maxHeight: "90%",
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "baseline",
                backgroundColor: "#121212",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginVertical: 10,
                    color: "#e7e7e7",
                  }}
                >
                  Comments
                </Text>
              </View>
              {/* <FlatList
                style={{ flex: 1, alignItems: "center", height: "100%" }}
                keyExtractor={(item, index) => item.id}
                data={comments}
                renderItem={({ item }) => (
                  <Text style={{ color: "white" }}>{item.data.message}</Text>
                )}
              /> */}
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                  width: "100%",
                  alignItems: "baseline",
                  flexGrow: 1.5,
                }}
                showsVerticalScrollIndicator={false}
              >
                {comments.map(
                  ({
                    id,
                    data: { message, displayName, timestamp, email },
                  }) => (
                    <View
                      style={{
                        padding: 15,
                        backgroundColor: "#fd6220",
                        alignSelf: "flex-start",
                        borderRadius: 20,
                        marginLeft: 15,
                        marginBottom: 10,
                        maxWidth: "80%",
                        position: "relative",
                      }}
                    >
                      <Text style={{ color: "white" }}>{message}</Text>
                    </View>
                  )
                )}
              </ScrollView>
              <KeyboardAvoidingView
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: 15,
                  backgroundColor: "transparent",
                }}
                keyboardVerticalOffset={64}
                behavior="padding"
              >
                {/* <TouchableOpacity
                  activeOpacity="0.5"
                  style={{ marginRight: 8 }}
                >
                  <Octicons name="smiley" size={24} color="#FD6220" />
                </TouchableOpacity> */}

                <TextInput
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  placeholder="Type Your Message"
                  placeholderTextColor="lightgray"
                  keyboardAppearance="dark"
                  keyboardType="default"
                  maxLength={300}
                  style={{
                    bottom: 0,
                    height: 40,
                    flex: 1,
                    marginRight: 15,
                    marginLeft: 8,
                    backgroundColor: "#000",
                    padding: 10,
                    color: "white",
                    borderRadius: 30,
                  }}
                />
                <TouchableOpacity activeOpacity="0.5" onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="#FD6220" />
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </ActionSheet>

        <TouchableOpacity
          onPress={shareImage}
          style={{
            marginBottom: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <MaterialCommunityIcons name="share" color="white" size={40} />
          <Text
            style={{
              color: "white",
              marginTop: 5,
            }}
          >
            102K
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ position: "absolute", top: "30%", left: "30%" }}
      >
        <LottieView
          source={require("../../assets/lottie/like.json")}
          autoPlay={false}
          loop={false}
          style={{
            height: 150,
            width: 150,
          }}
          ref={animation}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={onSwipeLeft}
        style={{ position: "absolute", top: "30%", left: "10%" }}
      >
        <LottieView
          source={require("../../assets/lottie/love.json")}
          autoPlay={false}
          loop={false}
          style={{ height: 150, width: 150 }}
          ref={loveAnime}
        />
      </TouchableOpacity> */}
    </TouchableWithoutFeedback>
  );
}
