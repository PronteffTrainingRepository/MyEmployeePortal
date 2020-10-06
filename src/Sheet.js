import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
} from "react-native";

const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;
function Sheet() {
  const [mark, setMark] = useState([]);

  // const setDates = () => {};

  useEffect(() => {
    setMark([
      ...mark,
      {
        id: mark.length,
        value: Date(),
      },
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Heading Starts */}
      <View style={{ backgroundColor: "purple", height: ht * 0.15 }}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: ht * 0.07,
            textAlignVertical: "center",
            height: ht * 0.15,
          }}
        >
          Attendence Of the Employee
        </Text>
      </View>
      {/* Heading Ends */}
      {/* <Button title="click" onPress={setDates} /> */}
      <ScrollView>
        {mark.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.record}>{item.id + 1}</Text>
            <Text style={styles.record}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Sheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  item: {
    flexDirection: "row",
    paddingLeft: wd * 0.02,
    justifyContent: "space-between",
    paddingRight: wd * 0.02,
    paddingTop: ht * 0.03,
    backgroundColor: "tomato",
    borderColor: "black",
    borderWidth: wd * 0.002,
    height: ht * 0.14,
  },
  record: {
    color: "white",
    fontWeight: "bold",
    fontSize: ht * 0.04,
  },
});
