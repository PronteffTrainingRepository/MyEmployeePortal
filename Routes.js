import React, { useEffect, useState } from "react";
import Main from "./src/Main";
import Home from "./src/Home";
import Sheet from "./src/Sheet";
import Login1 from "./src/Login1";
import WorkTime from "./src/WorkTime";
import Profile from "./src/Profile";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { enableScreens } from "react-native-screens";
// enableScreens();
const Stack = createStackNavigator();

function Routes() {
  const [nav, setNav] = useState("");

  useEffect(() => {
    GetData();
  }, [nav]);

  const GetData = async () => {
    const asynctoken = await AsyncStorage.getItem("token");
    console.log("hello token", asynctoken);
    if (asynctoken) {
      setNav("Main");
      console.log("nav", nav);
    } else {
      setNav("Login1");
      console.log("nav", nav);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={nav ? "Main" : "Login1"}>
        {console.log("helllolo jjijkoj")}
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
