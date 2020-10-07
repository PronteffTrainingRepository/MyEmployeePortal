import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform,
} from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import Constants from "expo-constants";
import * as Location from "expo-location";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function WorkTime({ navigation }) {
  const [submit, setSubmit] = useState(true);
  const [times, getUserTime] = useState(0);
  const [count, setCount] = useState(0);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setLocation(location);
      if (location.coords !== null) {
        if (
          location.coords.latitude >= 17.4387001 &&
          location.coords.latitude <= 17.4387999 &&
          location.coords.longitude >= 78.3946001 &&
          location.coords.longitude <= 78.3946999
        ) {
          null;
        } else {
          alert("not in range");
          navigation.navigate("Home", { total: times, countvalue: count });
        }
      }
    })();
  }, [count]);
  let text = "Waiting..";
  let text1 = "Me too Waiting";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.latitude);
    text1 = JSON.stringify(location.coords.longitude);
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      return true;
    });
    // return () => BackHandler.removeEventListener();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  const getFormattedTime = (time) => {
    getUserTime(time);
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Heading Starts */}
      <View
        style={{
          position: "absolute",
          top: 20,
          backgroundColor: "black",
          paddingLeft: wd * 0.04,
          paddingRight: wd * 0.04,
          paddingTop: ht * 0.02,
          paddingBottom: ht * 0.02,
          borderRadius: ht * 0.01,
        }}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", fontSize: ht * 0.03 }}
        >
          Number of Working Hours
        </Text>
      </View>
      {/* Heading Ends */}
      {/* Timer Starts */}
      <View>
        <Stopwatch
          laps
          secs
          start={submit}
          reset={false}
          //   options={options}
          getTime={getFormattedTime}
        />
      </View>
      {/* Timer Ends */}
      {/* Done for the Day Starts */}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home", { total: times, countvalue: count });
          }}
        >
          <Text style={styles.buttontext}>Done For the Day</Text>
        </TouchableOpacity>
      </View>
      {/* <View>
        <Text>{count}</Text>
      </View> */}
      {/* Done for the Day Ends */}
      <View>
        <Text>Latitude:{text}</Text>
        <Text>Longitude:{text1}</Text>
      </View>
    </View>
  );
}

export default WorkTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  button: {
    width: wd * 0.75,
    height: ht * 0.06,
    backgroundColor: "black",
    borderRadius: ht * 0.02,
    marginTop: ht * 0.1,
  },
  buttontext: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    height: ht * 0.06,
    fontWeight: "bold",
    fontSize: ht * 0.04,
  },
});
