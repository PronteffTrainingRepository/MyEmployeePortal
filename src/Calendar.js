import React from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;
function Calendar() {
  return (
    <View style={styles.container}>
      <StatusBar />
      {/* header starts */}
      <View
        style={{ backgroundColor: "#FC9600", height: ht * 0.08, elevation: 5 }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            height: ht * 0.08,
            fontWeight: "700",
            fontSize: ht * 0.04,
          }}
        >
          Pronteff Holidays
        </Text>
      </View>
      {/* header ends */}

      {/* Holidays lists starts */}
      <View style={styles.scroll}>
        <ScrollView>
          {/* 1 starts */}
          <View style={[styles.section, { backgroundColor: "#F33939" }]}>
            <Text style={styles.holidayname}>New Year</Text>
            <Text style={styles.holidaytime}>January 1, Wednesday</Text>
          </View>
          {/* 1 ends */}
          {/* 2 starts */}
          <View style={[styles.section, { backgroundColor: "#FD8C1E" }]}>
            <Text style={styles.holidayname}>Bhogi</Text>
            <Text style={styles.holidaytime}>January 14, Tuesday</Text>
          </View>
          {/* 2 ends */}
          {/* 3 starts */}
          <View style={[styles.section, { backgroundColor: "#2A610D" }]}>
            <Text style={styles.holidayname}>Sankranthi</Text>
            <Text style={styles.holidaytime}>January 15, Wednesday</Text>
          </View>
          {/* 3 ends */}
          {/* 4 starts */}
          <View style={[styles.section, { backgroundColor: "#063D3A" }]}>
            <Text style={styles.holidayname}>Mahashivratri</Text>
            <Text style={styles.holidaytime}>February 21, Friday</Text>
          </View>
          {/* 4 ends */}
          {/* 5 starts */}
          <View style={[styles.section, { backgroundColor: "#06203D" }]}>
            <Text style={styles.holidayname}>Holi</Text>
            <Text style={styles.holidaytime}>March 9, Monday</Text>
          </View>
          {/* 5 ends */}
          {/* 6 starts */}
          <View style={[styles.section, { backgroundColor: "#03A9F4" }]}>
            <Text style={styles.holidayname}>Ugadi</Text>
            <Text style={styles.holidaytime}>March 25, Wednesday</Text>
          </View>
          {/* 6 ends */}
          {/* 7 starts */}
          <View style={[styles.section, { backgroundColor: "black" }]}>
            <Text style={styles.holidayname}>Independence Day</Text>
            <Text style={styles.holidaytime}>August 15, Saturday</Text>
          </View>
          {/* 7 ends */}
          {/* 8 starts */}
          <View style={[styles.section, { backgroundColor: "purple" }]}>
            <Text style={styles.holidayname}>Gandhi Jayanti</Text>
            <Text style={styles.holidaytime}>Octuber 2, Friday</Text>
          </View>
          {/* 8 ends */}
          {/* 9 starts */}
          <View style={[styles.section, { backgroundColor: "tomato" }]}>
            <Text style={styles.holidayname}>Vijaya Dashmi</Text>
            <Text style={styles.holidaytime}>Octuber 26, Monday</Text>
          </View>
          {/* 9 ends */}
          {/* 10 starts */}
          <View
            style={[
              styles.section,
              { backgroundColor: "orange", marginBottom: ht * 0.2 },
            ]}
          >
            <Text style={styles.holidayname}>Chrismas</Text>
            <Text style={styles.holidaytime}>December 25, Friday</Text>
          </View>
          {/* 10 ends */}
        </ScrollView>
      </View>
      {/* Holiday lists ends */}
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  scroll: {
    alignItems: "center",
  },
  section: {
    width: wd * 0.95,
    height: ht * 0.14,
    elevation: 5,
    borderRadius: ht * 0.006,
    paddingLeft: wd * 0.08,
    paddingTop: ht * 0.02,
    marginTop: ht * 0.03,
  },
  holidayname: {
    color: "white",
    fontWeight: "700",
    fontSize: ht * 0.04,
  },
  holidaytime: {
    color: "white",
    fontWeight: "700",
  },
});
