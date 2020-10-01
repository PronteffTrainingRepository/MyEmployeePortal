import React from "react";
import { View, Dimensions, StyleSheet, StatusBar, Text } from "react-native";
const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;
function Sheet() {
  return (
    <View>
      <StatusBar />
      <Text>Sheet</Text>
    </View>
  );
}

export default Sheet;

const styles = StyleSheet.create({
  container: {},
});
