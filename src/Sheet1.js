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
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;
function Sheet1({ navigation }) {
  const [mark, setMark] = useState([]);
  const [self, setSelf] = useState("Nil");

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
        {mark.map((item, index) => (
          <ScrollView key={item.id}>
            <View
              style={[
                styles.item,
                { backgroundColor: index % 2 == 0 ? "#063D3A" : "#FD8C1E" },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.record,
                    { color: index % 2 == 0 ? "white" : "white" },
                  ]}
                >
                  {item.logoutDate}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.record,
                    { color: index % 2 == 0 ? "white" : "white" },
                  ]}
                >
                  {item.logoutTime}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.record,
                    { color: index % 2 == 0 ? "white" : "white" },
                  ]}
                >
                  {item.totalWorkingHrs}
                </Text>
              </View>
            </View>
          </ScrollView>
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
