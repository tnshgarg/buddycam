import React, { useLayoutEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Tab, TabView } from "react-native-elements";
import { Ionicons, FontAwesome } from "react-native-vector-icons";
import GridImageView from "react-native-grid-image-viewer";
import { db } from "../firebase";

export default function UserProfileImages() {
  // const [index, setIndex] = useState(0);
  const [myImages, setMyImages] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [myImageCollection, setMyImageCollection] = useState([]);
  const [imageSet, setImageSet] = useState([]);

  React.useEffect(() => {
    const unsubscribe = db.collection("myImages").onSnapshot((snapshot) => {
      setMyImages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    // myImages.map(({ id, data }) => {
    //   myImageCollection.push(data.imageUrl);
    //   // setMyImageCollection(imagesData.filter((imageUrl) => imageUrl));
    // });
    // // setImagesData(new Set(myImageCollection));
    return unsubscribe;
  }, []);

  let mySet;
  let unique_images = [];

  function getUniqueArr(arr) {
    let uniqueArr = new Set(arr);
    return uniqueArr;
  }

  useLayoutEffect(() => {
    myImages.map(({ id, data }) => {
      myImageCollection.push(data.imageUrl);
    });
    // setImageSet(getUniqueArr(myImageCollection));
  });

  return (
    <View style={{ paddingTop: 10 }}>
      <GridImageView data={myImageCollection} heightOfGridImage={175} />
      {/* {setImageSet(new Set(myImageCollection))} */}
    </View>
  );
}

// function ImageContainer() {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginBottom: 2,
//         width: "100%",
//         flexWrap: "wrap",
//       }}
//     >
//       <TouchableOpacity
//         style={{ width: "33%", height: 200 }}
//         activeOpacity={0.7}
//       >
//         <Image
//           style={{ width: "100%", height: "100%", borderRadius: 3 }}
//           source={require("../assets/tony.jpg")}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{ width: "33%", height: 200 }}
//         activeOpacity={0.7}
//       >
//         <Image
//           style={{ width: "100%", height: "100%", borderRadius: 3 }}
//           source={require("../assets/tony.jpg")}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{ width: "33%", height: 200 }}
//         activeOpacity={0.7}
//       >
//         <Image
//           style={{ width: "100%", height: "100%", borderRadius: 3 }}
//           source={require("../assets/tony.jpg")}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{ width: "33%", height: 200 }}
//         activeOpacity={0.7}
//       >
//         <Image
//           style={{ width: "100%", height: "100%", borderRadius: 3 }}
//           source={require("../assets/tony.jpg")}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }

{
  /* <Tab
        indicatorStyle={{ backgroundColor: "#FD6220" }}
        value={index}
        onChange={setIndex}
        style={{ backgroundColor: "white", marginHorizontal: 10 }}
      >
        <Tab.Item
          buttonStyle={{
            backgroundColor: "#000",
          }}
          containerStyle={{ backgroundColor: "#000" }}
          icon={<Ionicons name="images-outline" size={30} color="white" />}
        />
        <Tab.Item
          containerStyle={{ backgroundColor: "#000" }}
          buttonStyle={{ backgroundColor: "#000" }}
          icon={<FontAwesome name="bookmark-o" size={30} color="white" />}
        />
      </Tab> */
}

{
  /* <TabView value={index} onChange={setIndex}>
        <TabView.Item>
          <ImageContainer />
        </TabView.Item>
        <TabView.Item>
          <ImageContainer />
        </TabView.Item>
        <TabView.Item>
          <ImageContainer />
        </TabView.Item>
      </TabView> */
}
//Important Code
