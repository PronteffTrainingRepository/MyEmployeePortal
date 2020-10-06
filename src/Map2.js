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
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import * as Location from "expo-location";

const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;

function Home({ route, navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [attendence, setAttendence] = useState(0);
  //   const { user } = route.params;
  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.216721,
    latitudeDelta: 0.06,
    longitudeDelta: 0.05,
  });
  const [coordinates, setCoordinates] = useState({
    latitude: 28.6139,
    longitude: 77.216721,
  });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        ...region,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      setCoordinates({
        ...coordinates,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
    })();
  }, []);

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
          accuracy: Location.Accuracy.High,
        });
        setLocation(location);
        setRegion({
          ...region,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
        if (location.coords !== null) {
          if (
            location.coords.latitude >= 17.4387001 &&
            location.coords.latitude <= 17.4387999 &&
            location.coords.longitude >= 78.3946001 &&
            location.coords.longitude <= 78.3946999
          ) {
            alert("attence marked");
            setAttendence(1);
            // navigation.navigate("Sheet");
          } else {
            alert("Not in Range");
          }
        }
      })();
    }
  };
  let text = "Waiting..";
  let text1 = "Me too Waiting";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.latitude);
    text1 = JSON.stringify(location.coords.longitude);
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

const getDirections = async (startLoc, destinationLoc) => {
  try {
    const KEY = "AIzaSyDu9M5hxGv8SAvBjg7TUstCQI_IfaQ1a0c";
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};
  return (
    <View style={{ backgroundColor: "yellow" }}>
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
      <View style={{ alignItems: "center", marginBottom: 0 }}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: ht * 0.06,
              paddingTop: ht * 0.03,
            }}
          >
            Attendence
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: wd * 0.5,
            height: ht * 0.4,
            marginTop: 2,
            borderRadius: ht * 0.03,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center", flex: 2 }}>
            <Text style={{ fontWeight: "bold" }}>
              {/* Hi {user}, Your Attenece till Now is.. */}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Your Attendence for Today is
              {attendence == 1 ? attendence * 100 : 0} %
            </Text>
            <Text style={{ fontWeight: "bold" }}>Latitude :{text}</Text>
            <Text style={{ fontWeight: "bold" }}>Longitude : {text1}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              borderRadius: ht * 0.2,
              flex: 1,
            }}
          >
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
      <View style={{ marginBottom: ht * 0.6 }}>
        <MapView
          provider="google"
          region={region}
          // onRegionChange={onRegionChange}
          onRegionChangeComplete={(region) => setRegion(region)}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followUserLocation={true}
          zoomControlEnabled={true}
        >
          <Marker coordinate={coordinates} pinColor="green" />
        </MapView>
      </View>

      {/* Map Ends */}
      {/* Attendence Button Starts */}
      <View
        style={{ position: "absolute", bottom: ht * 0.7, right: wd * 0.04 }}
      >
        <TouchableOpacity
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
    height: ht * 1.25,
  },
});
