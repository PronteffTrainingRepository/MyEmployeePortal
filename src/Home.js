import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;

function Home({ WorkTime }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState({
    latitude: 17.4387,
    longitude: 78.3946,
  });
  const [employeename, setEmployeeName] = useState(null);
  const [employeeimage, setEmployeeImage] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 17.385,
    longitude: 78.4867,
    latitudeDelta: 0.006,
    longitudeDelta: 0.005,
  });
  const [coordinates, setCoordinates] = useState({
    latitude: 28.6139,
    longitude: 77.216721,
  });

  const watch = async () => {
    let { status } = await Location.requestPermissionsAsync();
    console.log("check");
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      console.log("denied");
      return;
    } else {
      try {
        let location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        setLocation(location);
        if (location) {
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
          setCoords({
            ...coords,
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
        }
      } catch (e) {
        alert(
          "We could not find your position. Please make sure your location service provider is on"
        );
        console.log("Error while trying to get location: ", e);
      }
    }
    console.log("hello");
    console.log("location", location);
  };

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
      console.log("platform");
    } else {
      console.log("watch");
      watch();
    }
  }, []);

  const watch1 = async () => {
    console.log("came here");
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    } else {
      console.log("inside else");
      try {
        console.log("waiting for permissions");
        let locations = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        console.log("i am back");
        setLocation(locations);
        console.log("down location");
        setRegion({
          ...region,
          longitude: locations.coords.longitude,
          latitude: locations.coords.latitude,
        });
        console.log("im here");
        console.log("location", locations);
        if (locations.coords !== null) {
          console.log("im here too");
          if (
            locations.coords.latitude >= 17.438250832 &&
            locations.coords.latitude <= 17.439149167 &&
            locations.coords.longitude >= 78.394129193 &&
            locations.coords.longitude <= 78.395070806
          ) {
            getData();
          } else {
            alert("Not in Range");
          }
        }
      } catch (e) {
        alert(
          "We could not find your position. Please make sure your location service provider is on"
        );
        console.log("Error while trying to get location: ", e);
      }
    }
  };
  async function getData() {
    const asynctoken = await AsyncStorage.getItem("token");
    console.log(asynctoken);
    let date = new Date();

    await axios
      .post(
        "http://183.83.219.220:5000/login/markAttendance",

        {
          loginDate: `${
            date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()
          }`,
          loginTime: `${date.getHours() + ":" + date.getMinutes()}`,
          latitude: `${location.coords.latitude}`,
          longitude: `${location.coords.longitude}`,
        },
        {
          headers: {
            contentType: "application/json",
            Authorization: `Bearer ${asynctoken}`,
          },
        }
      )
      .then(async (res) => {
        console.log(res.data);
        alert("Attendence Timer is going to Start");
        navigation.navigate("WorkTime");
      })
      .catch((msg) => {
        alert(msg);
      });
  }

  const See = async () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      watch1();
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

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const user = await AsyncStorage.getItem("user");
    let userinfo = JSON.parse(user);
    console.log(userinfo.photo);
    setEmployeeName(userinfo.empName);
    setEmployeeImage(userinfo.photo);
    console.log("userinfo.photo", userinfo.photo);
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "lightgrey" }}>
        <StatusBar barStyle="light-content" backgroundColor="#022169" />

        {/* Attendence Starts */}
        <View
          style={{
            alignItems: "center",
            marginBottom: ht * 0.03,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: ht * 0.06,
                paddingTop: ht * 0.03,
                color: "red",
              }}
            >
              Attendence
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#022169",
              width: wd * 0.48,
              height: ht * 0.4,
              marginTop: 2,
              borderRadius: ht * 0.03,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 3,
                paddingLeft: wd * 0.02,
              }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: ht * 0.06,
                    color: "white",
                  }}
                >
                  Welcome!!!
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: ht * 0.07,
                    color: "white",
                  }}
                >
                  {employeename}
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  "Rest at the end, not in the middle"
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                borderRadius: ht * 0.2,
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: wd * 0.15,
                  height: ht * 0.3,
                  borderRadius: ht * 0.01,
                  borderColor: "white",
                  borderWidth: wd * 0.002,
                }}
                source={{
                  uri: `${employeeimage}`,
                }}
              />
            </View>
          </View>
        </View>
        {/* Attendence Ends */}
        {/* Map starts */}
        <View
          style={{
            marginBottom: ht * 0.56,
            alignItems: "center",
          }}
        >
          <MapView
            provider="google"
            region={region}
            // onRegionChange={onRegionChange}
            //onRegionChangeComplete={(region) => setRegion(region)}
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followUserLocation={true}
            zoomControlEnabled={true}
          >
            <Marker coordinate={coordinates} pinColor="green" />
            <Circle center={coords} radius={50} fillColor="transparent" />
          </MapView>
        </View>

        {/* Map Ends */}
        {/* Attendence Button Starts */}
        <View
          style={{ position: "absolute", top: ht * 0.57, right: wd * 0.01 }}
        >
          <TouchableOpacity
            onPress={() => See()}
            // onPress={() => navigation.navigate("WorkTime")}
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
    </ScrollView>
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
    width: wd * 0.5,
    height: ht * 1.14,
    borderRadius: ht * 0.04,
  },
});
