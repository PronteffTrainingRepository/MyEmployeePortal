import React from "react";
import { View, StyleSheet } from "react-native";
import Routes from "./Routes";

export default function App() {
  return (
   
      <View style={styles.container}>
        <Routes  />
      </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
