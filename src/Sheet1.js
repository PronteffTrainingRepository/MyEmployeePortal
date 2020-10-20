import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Text, FlatList } from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;
function Sheet1({ navigation }) {
  const [mark, setMark] = useState([]);

  useEffect(() => {
    GetData();
  }, []);
  const GetData = async () => {
    const asyncuser = await AsyncStorage.getItem("user");
    let User = JSON.parse(asyncuser);
    console.log(User._id);
    // console.log("hshshsh", asyncuser);
    const asynctoken = await AsyncStorage.getItem("token");

    console.log(asynctoken);
    Axios.get(`http://183.83.219.220:5000/logout/userAttendance/${User._id}`, {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    })
      .then((res) => {
        console.log("responsee", res.data);
        setMark(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      {/* Value Heading Starts */}

      <View style={[styles.item, { marginTop: 0 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.record1}>Date</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.record1}>Time</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.record1}>Total Time</Text>
        </View>
      </View>
      {/* Value Heading Ends */}

      <View style={{ marginBottom: ht * 0.05 }}>
        {mark.map((item, index) => (
          <View
            key={index}
            style={[
              styles.item,
              { backgroundColor: index % 2 == 0 ? "#063D3A" : "#FD8C1E" },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.record}>{item.logoutDate}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.record}>{item.logoutTime}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.record}>{item.totalWorkingHrs}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Sheet1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  item: {
    flexDirection: "row",
    paddingLeft: wd * 0.02,
    justifyContent: "center",
    paddingRight: wd * 0.02,

    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: wd * 0.001,
    height: ht * 0.07,
    elevation: 5,
    marginTop: ht * 0.01,
  },
  record: {
    color: "white",
    fontWeight: "bold",
    fontSize: ht * 0.025,
    textAlign: "center",
    height: ht * 0.07,
    textAlignVertical: "center",
  },
  record1: {
    color: "black",
    fontWeight: "bold",
    fontSize: ht * 0.025,
    textAlign: "center",
    height: ht * 0.07,
    textAlignVertical: "center",
  },
});
