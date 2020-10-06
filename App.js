import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, Text, View, Button } from "react-native";
import Login from "./src/Login";
import Home from "./src/Home";
import Sheet from "./src/Sheet";
import Map from "./src/Map";
import Map2 from "./src/Map2";
import Login1 from "./src/Login1";
import WorkTime from "./src/WorkTime";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Buttons from "./src/Buttons";
const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      {/* <Map2 /> */}
      {/* <Login1 /> */}
      <WorkTime />
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen
    //       name="Login"
    //       component={Login}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Home"
    //       component={Home}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Sheet"
    //       component={Sheet}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
const Drawer = createDrawerNavigator();
export function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Buttons" component={Buttons} />
      <Drawer.Screen name="Home1" component={Home} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Sheet" component={Sheet} />
    </Drawer.Navigator>
  );
}
