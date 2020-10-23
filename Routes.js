import React, { useEffect, useState } from "react";
import Main from "./src/Main";
import Home from "./src/Home";
import Sheet from "./src/Sheet";
import Login1 from "./src/Login1";
import WorkTime from "./src/WorkTime";
import Profile from "./src/Profile";
import Main1 from "./src/Main1";
import "react-native-gesture-handler";
import Main2 from "./src/Main2";
import Login from "./src/Login";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View, Text } from "react-native";

// import { enableScreens } from "react-native-screens";
// enableScreens();
const Stack = createStackNavigator();

function Routes() {
  const [nav, setNav] = useState(null);
  const getData = async () => {
    const asynctoken = await AsyncStorage.getItem("token").then(
      (asynctoken) => {
        if (asynctoken != null) {
          setNav(true);
        } else {
          setNav(false);
        }
      }
    );
  };

  useEffect(() => {
    getData();
  }, [nav]);

  if (nav == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={nav ? "Main" : "Login1"}>
        {/* <Stack.Navigator initialRouteName="Login"> */}

        <Stack.Screen
          name="Login1"
          component={Login1}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkTime"
          component={WorkTime}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
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

export default Routes;
