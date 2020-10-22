import React, { useState } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Calendar from "./Calendar";
import Home from "./Home";
import Leave from "./Leave";
import HomeHeader from "./headers/HomeHeader";
import LeaveHeader from "./headers/LeaveHeader";
import CalendarHeader from "./headers/CalendarHeader";
import SheetHeader from "./headers/SheetHeader";
import Sheet1 from "./Sheet1";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Main({ navigation }) {
  const [compo, setCompo] = useState(0);
  const [header, setHeader] = useState(0);
  const componentss = [<Home />, <Leave />, <Calendar />, <Sheet1 />];
  const headerss = [
    <HomeHeader />,
    <LeaveHeader />,
    <CalendarHeader />,
    <SheetHeader />,
  ];
  // let set1 = null;
  // let set2 = null;
  // console.log("set1", set1);
  // console.log("set2", set2);
  // if (compo == 1) {
  //   set1 = <Home />;
  //   console.log("home");
  // } else if (compo == 2) {
  //   set1 = <Leave />;
  //   console.log("leave");
  // } else if (compo == 3) {
  //   set1 = <Calendar />;
  //   console.log("calendar");
  // } else if (compo == 4) {
  //   set1 = <Sheet1 />;
  //   console.log("sheet");
  // }
  // console.log("set1", set1);
  // console.log("set2", set2);
  // if (header == 1) {
  //   set2 = <HomeHeader />;
  //   console.log("homeheader");
  // } else if (header == 2) {
  //   set2 = <LeaveHeader />;
  //   console.log("LeaveHeader");
  // } else if (header == 3) {
  //   set2 = <CalendarHeader />;
  //   console.log("CalendarHeader");
  // } else if (header == 4) {
  //   set2 = <SheetHeader />;
  //   console.log("SheetHeader");
  // }

  // console.log("set1", set1);
  // console.log("set2", set2);
  return (
    <View>
      {/* {console.log("component set1", set1)}
      {console.log("component set2", set2)} */}
      <StatusBar />
      <View>{headerss[header]}</View>
      <View style={styles.header}>
        {/* Home starts */}
        <TouchableOpacity
          style={[
            styles.headerTouch,
            {
              backgroundColor: header == 0 ? "#022169" : "white",
              elevation: header == 0 ? 30 : 0,
            },
          ]}
          onPress={() => {
            setCompo(0);
            setHeader(0);
          }}
        >
          <Entypo
            name="home"
            size={24}
            color={header == 0 ? "white" : "black"}
          />
          <Text
            style={[
              styles.headerText,
              { color: header == 0 ? "white" : "black" },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        {/* Home Ends */}
        {/* Leave Starts */}
        <TouchableOpacity
          style={[
            styles.headerTouch,
            {
              backgroundColor: header === 1 ? "#022169" : "white",
              elevation: header == 1 ? 30 : 0,
            },
          ]}
          onPress={() => {
            setCompo(1);
            setHeader(1);
          }}
        >
          <FontAwesome5
            name="temperature-high"
            size={24}
            color={header == 1 ? "white" : "black"}
          />
          <Text
            style={[
              styles.headerText,
              { color: header == 1 ? "white" : "black" },
            ]}
          >
            Leave
          </Text>
        </TouchableOpacity>
        {/* Leave Ends */}
        {/* Calendar Starts */}
        <TouchableOpacity
          style={[
            styles.headerTouch,
            {
              backgroundColor: header == 2 ? "#022169" : "white",
              elevation: header == 2 ? 30 : 0,
            },
          ]}
          onPress={() => {
            setCompo(2);
            setHeader(2);
          }}
        >
          <Entypo
            name="calendar"
            size={24}
            color={header == 2 ? "white" : "black"}
          />
          <Text
            style={[
              styles.headerText,
              { color: header == 2 ? "white" : "black" },
            ]}
          >
            Calendar
          </Text>
        </TouchableOpacity>
        {/* Calendar Ends */}
        {/* Records starts */}
        <TouchableOpacity
          style={[
            styles.headerTouch,
            {
              backgroundColor: header == 3 ? "#022169" : "white",
              elevation: header == 3 ? 30 : 0,
            },
          ]}
          onPress={() => {
            setCompo(3);
            setHeader(3);
          }}
        >
          <FontAwesome5
            name="book"
            size={24}
            color={header == 3 ? "white" : "black"}
          />
          <Text
            style={[
              styles.headerText,
              { color: header == 3 ? "white" : "black" },
            ]}
          >
            Records
          </Text>
        </TouchableOpacity>
        {/* Records Ends */}
      </View>

      <View>{componentss[compo]}</View>
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    position: "relative",
    zIndex: 2,
    elevation: 5,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    height: ht * 0.07,
  },
  headerText: {
    textAlign: "center",
    textAlignVertical: "center",
    height: ht * 0.03,
    fontWeight: "700",
    fontSize: ht * 0.025,
    paddingLeft: wd * 0.01,
  },
  headerTouch: {
    flex: 1,
    borderRightWidth: wd * 0.001,
    borderRightColor: "grey",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
