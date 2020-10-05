import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Constants from "expo-constants";
import * as Location from "expo-location";

const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;

// const origin = { latitude: 37.3318456, longitude: -122.0296002 };
// const destination = { latitude: 37.771707, longitude: -122.4053769 };
// const GOOGLE_MAPS_APIKEY = "AIzaSyBTHErKQB1XnK0zFBlaoL2A7zkKA4r7glI";

function Home({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [attendence, setAttendence] = useState(0);
  // const { user } = route.params;

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const See = () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: 1000,
        });
        setLocation(location);
        setRegion({
          ...region,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
        //  navigation.navigate("Sheet");
        if (location.coords !== null) {
          if (
            (location.coords.latitude >= 17.43873 ||
              location.coords.latitude <= 17.43877) &&
            (location.coords.longitude >= 78.39461 ||
              location.coords.longitude <= 78.39469)
          ) {
            alert("attence marked");
            setAttendence(attendence + 0.01);
            navigation.navigate("Sheet");
          } else {
            alert("Not in Range");
          }
        }
      })();
    }
  };
  // const go = () => {
  //   setRegion({
  //     ...region,
  //     longitude: location.coords.longitude,
  //     latitude: location.coords.latitude,
  //   });
  // };
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const data = {
    // labels: ["Swim", "Bike", "Run"], // optional
    data: [attendence],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "black",
    backgroundGradientTo: "black",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // barPercentage:100,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
  const [dir, setDir] = useState(false);

  const onRegionChange = (region) => {
    setRegion({ region });
  };

  return (
    <View>
      <StatusBar />
      {/* header bar starts */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AntDesign name="caretright" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: wd * 0.14 }}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: ht * 0.07,
            }}
          >
            Home
          </Text>
        </View>
      </View>

      {/* header bar ends */}
      {/* Attendence Starts */}
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: "white",
            width: wd * 0.5,
            height: ht * 0.46,
            marginTop: 2,
            borderRadius: ht * 0.03,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>Attendence</Text>
            <Text>Hi user, Your Attenece till Now is..</Text>
            <Text>
              Your {Attendence} Percentage is {attendence} %
            </Text>
            {/* <Text>location :{text}</Text> */}
          </View>
          <View style={{ alignItems: "flex-end", borderRadius: ht * 0.2 }}>
            <ProgressChart
              data={data}
              width={wd * 0.12}
              height={ht * 0.24}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
              style={{ borderRadius: ht * 0.2 }}
            />
          </View>
        </View>
      </View>
      {/* Attendence Ends */}
      {/* Map starts */}
      <View>
        <MapView
          provider="google"
          region={region}
          onRegionChange={onRegionChange}
          style={[styles.map, { paddingBottom: 290 }]}
          showsUserLocation={true}
          followUserLocation={true}
          zoomControlEnabled={true}
        >
          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            resetOnChange={true}
            directionsServiceBaseUrl="https://maps.googleapis.com/maps/api/directions/json"
          /> */}
        </MapView>
      </View>
      {/* Map Ends */}
      {/* Attendence Button Starts */}
      <View
        style={{ position: "absolute", bottom: ht * 0.08, right: wd * 0.03 }}
      >
        <TouchableOpacity
          // onPress={See}
          onPress={See}
          style={{
            width: wd * 0.2,
            height: ht * 0.14,
            backgroundColor: "lightgrey",
            borderRadius: ht * 0.01,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              color: "red",
              fontWeight: "bold",
              fontSize: ht * 0.04,
              height: ht * 0.14,
            }}
          >
            Mark Attendence
          </Text>
        </TouchableOpacity>
      </View>
      {/* Attendence Button Ends */}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    width: wd * 0.7,
    height: ht * 0.14,
    backgroundColor: "red",
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wd * 0.02,
    zIndex: 3,
  },
  map: {
    width: wd * 0.52,
    height: ht * 1.3,
  },
});
