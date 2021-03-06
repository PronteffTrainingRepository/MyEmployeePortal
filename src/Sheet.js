import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  Alert,
} from "react-native";

const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;
function Sheet({ route, navigation }) {
  const [mark, setMark] = useState([]);
  const [self, setSelf] = useState("Nil");

  const { countvalue1 } = route.params;
  const { countvalue2 } = route.params;
  useEffect(() => {
    setMark([
      ...mark,
      {
        id: mark.length,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds(),
      },
    ]);
  }, []);
  useEffect(() => {
    if (countvalue1) {
      setSelf(countvalue1);
    } else if (countvalue2) {
      setSelf(countvalue2);
    }
    if (countvalue1) {
      Alert.alert("Attendence Marked", "Go to Home", [
        { text: "OK", onPress: () => navigation.navigate("Main") },
      ]);
    } else if (countvalue2) {
      Alert.alert("Out of range", "Go to Home", [
        { text: "OK", onPress: () => navigation.navigate("Main") },
      ]);
    }
  }, []);
  // console.log(countervalue1);
  return (
    <View style={styles.container}>
      {/* heder start */}
      <View
        style={{
          backgroundColor: "#022169",
          height: ht * 0.15,
          //   justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            height: ht * 0.15,
            color: "white",
            fontSize: ht * 0.05,
            fontWeight: "700",
          }}
        >
          Attendence Of the Employee
        </Text>
      </View>
      {/* hedaer ends */}
      {/* Value Heading Starts */}
      <View style={[styles.item, { marginTop: 0 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.record}>Date</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.record}>Time</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.record}>Total Time</Text>
        </View>
      </View>
      {/* Value Heading Ends */}
      <View style={{ marginBottom: 50 }}>
        {mark.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.record}>
                {item.day}/{item.month + 1}/{item.year}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.record}>
                {item.hour}:{item.min}:{item.sec}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.record}>{self}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Sheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  item: {
    flexDirection: "row",
    paddingLeft: wd * 0.02,
    justifyContent: "space-between",
    paddingRight: wd * 0.02,
    paddingTop: ht * 0.03,
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: wd * 0.001,
    height: ht * 0.14,
    elevation: 5,
    marginTop: ht * 0.02,
  },
  record: {
    color: "#2D3D3F",
    fontWeight: "bold",
    fontSize: ht * 0.04,
    textAlign: "center",
  },
});
