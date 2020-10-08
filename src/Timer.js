import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StatusBar, StyleSheet } from "react-native";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Timer() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(59);
  const [hour, setHour] = useState(0);
  const [extra1, setExtra1] = useState(0);
  const [extra2, setExtra2] = useState(0);
  const [extra3, setExtra3] = useState(0);

  useEffect(() => {
    const interval = setInterval(set, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const set = () => {
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
    <View style={styles.clock}>
     
      <Text style={styles.clockTime}>
        {extra3}
        {hour}:{extra2}
        {min}:{extra1}
        {sec}
      </Text>
    </View>
  );
}

export default Timer;

const styles = StyleSheet.create({
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
