import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, Text, View, Button } from "react-native";
import Login from "./src/Login";
import Home from "./src/Home";
import Sheet from "./src/Sheet";
import Map from "./src/Map";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Login /> */}
    //   <Home />
    //   {/* <Map /> */}
    //   {/* <Sheet /> */}
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sheet"
          component={Sheet}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
      <Drawer.Screen name="Home1" component={Home} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Sheet" component={Sheet} />
    </Drawer.Navigator>
  );
}
