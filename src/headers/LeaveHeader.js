import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;
function LeaveHeader() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headertext}>Apply for the leave</Text>
      </View>
    </View>
  );
}

export default LeaveHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#022169",
    justifyContent: "center",
    alignItems: "center",
    height: ht * 0.07,
    elevation: 10,
  },
  headertext: {
    color: "white",
    fontSize: ht * 0.03,
    fontWeight: "700",
  },
});
