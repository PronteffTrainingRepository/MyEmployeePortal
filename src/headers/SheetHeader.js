import React from "react";
import { View, Dimensions, StyleSheet, Text, StatusBar } from "react-native";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function SheetHeader() {
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#022169" />
      <View
        style={{
          backgroundColor: "#022169",
          height: ht * 0.07,
            justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: ht * 0.03,
            textAlignVertical: "center",
            height: ht * 0.1,
          }}
        >
          Attendence Of the Employee
        </Text>
      </View>
    </View>
  );
}

export default SheetHeader;

const styles = StyleSheet.create({});
