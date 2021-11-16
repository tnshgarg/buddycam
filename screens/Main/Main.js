import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MainHeader from "../../components/MainHeader";
import MainChild from "./MainChild";
import { auth, db, storage } from "../../firebase";

export default function Main({ route, navigation }) {
  const [images, setImages] = useState([]);

  React.useEffect(() => {
    const unsubscribe = db.collection("images").onSnapshot((snapshot) => {
      setImages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, [route]);

  const renderLoader = () => <ActivityIndicator size="large" color="#fd6220" />;

  return (
    <View style={{ backgroundColor: "#000", height: "100%", width: "100%" }}>
      <MainHeader
        navigateToSearch={() => navigation.navigate("Search")}
        navigateToProfile={() => navigation.navigate("Profile")}
      />
      {images.length == 0 && (
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/polar-correspondence.png")}
            style={{ height: "60%", resizeMode: "contain", width: "90%" }}
          />
          <Text style={{ fontSize: 30, color: "white", textAlign: "center" }}>
            Discovering Content For You ❤️❤️
          </Text>
        </View>
      )}

      <FlatList
        decelerationRate={0.5}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        data={images}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={10}
        initialNumToRender={10}
        keyExtractor={(item, index) => item.id}
        onEndReachedThreshold={0}
        ListFooterComponent={renderLoader}
        renderItem={({ item }) => (
          <MainChild
            identity={item.id}
            imageProp={item.data.imageUrl}
            description={item.data.postDesc}
            displayName={item.data.displayName}
            timestamp={item.data.timestamp}
            key={item.id}
          />
        )}
      />
    </View>
  );
}
