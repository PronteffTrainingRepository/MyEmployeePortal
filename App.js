import React from "react";
import { View, StyleSheet } from "react-native";
import Home from "./src/Home";
import Sheet from "./src/Sheet";
import Login1 from "./src/Login1";
import WorkTime from "./src/WorkTime";
import Leave from "./src/Leave";
import Calendar from "./src/Calendar";
import Timer from "./src/Timer";
import Profile from "./src/Profile";
import Sheet1 from "./src/Sheet1";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeHeader from "./src/headers/HomeHeader";
import LeaveHaeder from "./src/headers/LeaveHeader";
import Main from "./src/Main";
import SheetHeader from "./src/headers/SheetHeader";
import DatePickerComponent from "./src/DatePickerComponent";
import NewLeave from "./src/NewLeave";
// import Shankar from "./src/Shankar";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";

enableScreens();
const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Home /> */}
    //   {/* <Map2 /> */}
    //   {/* <Login1 /> */}
    //   {/* <WorkTime /> */}
    //   {/* <DatePickerComponent /> */}
    //   {/* <Sheet1 /> */}
    //   {/* <Shankar /> */}
    //   {/* <Timer /> */}
    //   {/* <Leave /> */}
    //   {/* <Calendar /> */}
    //   <NewLeave />
    //   {/* <HomeHeader /> */}
    //   {/* <LeaveHaeder /> */}
    //   {/* <Profile /> */}
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login1">
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
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Leave"
          component={Leave}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
