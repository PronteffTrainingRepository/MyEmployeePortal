import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;
function CalendarHeader() {
  return (
    <View>
      <View
        style={{ backgroundColor: "#022169", height: ht * 0.07, elevation: 5 }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            height: ht * 0.07,
            fontWeight: "700",
            color: "white",
            fontSize: ht * 0.03,
          }}
        >
          Pronteff Holidays
        </Text>
      </View>
    </View>
  );
}

export default CalendarHeader;

const styles = StyleSheet.create({});
