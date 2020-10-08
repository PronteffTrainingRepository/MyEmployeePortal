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
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const [extra1, setExtra1] = useState(0);
  const [extra2, setExtra2] = useState(0);
  const [extra3, setExtra3] = useState(0);

  const watch = async () => {
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
        navigation.navigate("Home", {  countvalue: count });
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      watch();
    }
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
    return () => BackHandler.removeEventListener();
  }, []);

  useEffect(() => {
    const interval = setInterval(set, 1000);
    return () => clearInterval(interval);
  }, []);
  const set = () => {
    setCount((count) => count + 1);
  };
  useEffect(() => {
    const interval = setInterval(sets, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const sets = () => {
    setSec((sec) => sec + 1);
  };
  useEffect(() => {
    if (sec > 59) {
      setSec(0);
      setMin((min) => min + 1);
    }
    if (min > 59) {
      setMin(0);
      setHour((hour) => hour + 1);
    }
    if (sec < 10) {
      setExtra1(0);
    } else {
      setExtra1("");
    }
    if (min < 10) {
      setExtra2(0);
    } else {
      setExtra2("");
    }
    if (hour < 10) {
      setExtra3(0);
    } else {
      setExtra3("");
    }
  }, [sec]);
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
        <View style={styles.clock}>
          <Text style={styles.clockTime}>
            {extra3}
            {hour}:{extra2}
            {min}:{extra1}
            {sec}
          </Text>
        </View>
      </View>
      {/* Timer Ends */}
      {/* Done for the Day Starts */}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home", {  countvalue: count });
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
  clock: {
    backgroundColor: "red",
    alignItems: "center",
    width: wd * 0.5,
    height: ht * 0.1,
    justifyContent: "center",
    borderRadius: ht * 0.01,
  },
  clockTime: {
    color: "white",
    fontWeight: "bold",
    fontSize: ht * 0.04,
  },
});
