import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
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

function Main1({ navigation }) {
  const [compo, setCompo] = useState(1);
  const [header, setHeader] = useState(1);
  const [set1, setSet1] = useState(null);
  const [set2, setSet2] = useState(null);
  console.log("i am below state variables");
  // let set1, set2;
  useEffect(() => {
    if (compo == 1) {
      // set1 = <Home />;
      setSet1(<Home />);
      console.log("hellooo11------");
    } else if (compo == 2) {
      setSet1(<Leave />);
      // set1 = <Leave />;
    } else if (compo == 3) {
      setSet1(<Calendar />);
      // set1 = <Calendar />;
    } else if (compo == 4) {
      // set1 = <Sheet1 />;
      setSet1(<Sheet />);
    }

    if (header == 1) {
      // set2 = <HomeHeader />;
      setSet2(<HomeHeader />);
    } else if (header == 2) {
      // set2 = <LeaveHeader />;
      setSet2(<LeaveHeader />);
    } else if (header == 3) {
      // set2 = <CalendarHeader />;
      setSet2(<CalendarHeader />);
    } else if (header == 4) {
      // set2 = <SheetHeader />;
      setSet2(<SheetHeader />);
    }
  }, [compo, header, set1, set2]);
  console.log("above activity");
  if (set1 == null && set2 == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {console.log("in activity")}
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  } else {
    return (
      <View>
        <StatusBar />
        <View>{set2}</View>
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.headerTouch,
              {
                backgroundColor: header == 1 ? "#022169" : "white",
                elevation: header == 1 ? 30 : 0,
              },
            ]}
            onPress={() => {
              setCompo(1);
              setHeader(1);
            }}
          >
            <Entypo
              name="home"
              size={24}
              color={header == 1 ? "white" : "black"}
            />
            <Text
              style={[
                styles.headerText,
                { color: header == 1 ? "white" : "black" },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerTouch,
              {
                backgroundColor: header === 2 ? "#022169" : "white",
                elevation: header == 3 ? 30 : 0,
              },
            ]}
            onPress={() => {
              setCompo(2);
              setHeader(2);
            }}
          >
            <FontAwesome5
              name="temperature-high"
              size={24}
              color={header == 2 ? "white" : "black"}
            />
            <Text
              style={[
                styles.headerText,
                { color: header == 2 ? "white" : "black" },
              ]}
            >
              Leave
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerTouch,
              {
                backgroundColor: header == 3 ? "#022169" : "white",
                elevation: header == 1 ? 30 : 0,
              },
            ]}
            onPress={() => {
              setCompo(3);
              setHeader(3);
            }}
          >
            <Entypo
              name="calendar"
              size={24}
              color={header == 3 ? "white" : "black"}
            />
            <Text
              style={[
                styles.headerText,
                { color: header == 3 ? "white" : "black" },
              ]}
            >
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerTouch,
              {
                backgroundColor: header == 4 ? "#022169" : "white",
                elevation: header == 4 ? 30 : 0,
              },
            ]}
            onPress={() => {
              setCompo(4);
              setHeader(4);
            }}
          >
            <FontAwesome5
              name="book"
              size={24}
              color={header == 4 ? "white" : "black"}
            />
            <Text
              style={[
                styles.headerText,
                { color: header == 4 ? "white" : "black" },
              ]}
            >
              Records
            </Text>
          </TouchableOpacity>
        </View>

        <View>{set1}</View>
      </View>
    );
  }
}

export default Main1;

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
