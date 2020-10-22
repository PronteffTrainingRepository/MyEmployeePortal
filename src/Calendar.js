import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Image,
} from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import DropdownAlert from "react-native-dropdownalert";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;
function Calendar() {
  const [dropdown, setDropDown] = useState();
  const itemAction = (item) => {
    switch (item.type) {
      case "close":
        closeAction();
        break;
      default:
        const title = item.type;
        dropdown.alertWithType(item.type, title, item.message);
    }
  };
  const handleClose = (data) => {
    console.log(data);
  };
  const handleCancel = (data) => {
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#022169" />
      {/* Holidays lists starts */}
      <View style={styles.scroll}>
        <ScrollView>
          {/* 1 starts */}
          <View style={[styles.section, { backgroundColor: "#F33939" }]}>
            <TouchableOpacity
              onPress={() =>
                itemAction({
                  // type: "success",
                  message:
                    "New Year is the time or day at which a new calendar year begins and the calendar's year count increments by one.",
                  title: "New Year",
                })
              }
            >
              <Text style={styles.holidayname}>New Year</Text>
              <Text style={styles.holidaytime}>January 1, Wednesday</Text>
            </TouchableOpacity>
          </View>
          {/* 1 ends */}
          {/* 2 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Bhogi is the first day of the four-day Pongal festival and Makara Sankranti. In Gregorian calendar it is usually celebrated on 13 January. ",
                title: "Bhogi",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "#FD8C1E" }]}>
              <Text style={styles.holidayname}>Bhogi</Text>
              <Text style={styles.holidaytime}>January 14, Tuesday</Text>
            </View>
          </TouchableOpacity>
          {/* 2 ends */}
          {/* 3 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Each Sankranti is marked as the beginning of a month in the sidereal solar calendars. ",
                title: "Sankranti",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "#2A610D" }]}>
              <Text style={styles.holidayname}>Sankranthi</Text>
              <Text style={styles.holidaytime}>January 15, Wednesday</Text>
            </View>
          </TouchableOpacity>
          {/* 3 ends */}
          {/* 4 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Maha Shivaratri is a festival celebrated in honour of Lord Shiva. The name also refers to the night when Shiva performs the heavenly dance.",
                title: "MahaShivratri",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "#063D3A" }]}>
              <Text style={styles.holidayname}>Mahashivratri</Text>
              <Text style={styles.holidaytime}>February 21, Friday</Text>
            </View>
          </TouchableOpacity>
          {/* 4 ends */}
          {/* 5 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  'Holi is a popular ancient Hindu festival, also known as the Indian "festival of spring", the "festival of colours", or the "festival of love".',
                title: "Holi",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "#06203D" }]}>
              <Text style={styles.holidayname}>Holi</Text>
              <Text style={styles.holidaytime}>March 9, Monday</Text>
            </View>
          </TouchableOpacity>
          {/* 5 ends */}
          {/* 6 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Ugadi is the New Year's Day for the States of Andhra Pradesh, Telangana and Karnataka in India.",
                title: "Ugadi",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "#03A9F4" }]}>
              <Text style={styles.holidayname}>Ugadi</Text>
              <Text style={styles.holidaytime}>March 25, Wednesday</Text>
            </View>
          </TouchableOpacity>
          {/* 6 ends */}
          {/* 7 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Independence Day is celebrated  on 15 Aug as national holiday in India commemorating the nation's Freedom from the Uk on 15 Aug 1947.",
                title: "Independence Day",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "black" }]}>
              <Text style={styles.holidayname}>Independence Day</Text>
              <Text style={styles.holidaytime}>August 15, Saturday</Text>
            </View>
          </TouchableOpacity>
          {/* 7 ends */}
          {/* 8 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Gandhi Jayanti is an event celebrated in India to mark the birthday of Mahatma Gandhi. It is celebrated annually on 2 October.",
                title: "Gandhi Jayanti",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "purple" }]}>
              <Text style={styles.holidayname}>Gandhi Jayanti</Text>
              <Text style={styles.holidaytime}>October 2, Friday</Text>
            </View>
          </TouchableOpacity>
          {/* 8 ends */}
          {/* 9 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Vijayadashami also known as Dussehra is a major Hindu festival celebrated at the end of Navaratri every year.",
                title: "Vijaya Dashmi",
              })
            }
          >
            <View style={[styles.section, { backgroundColor: "tomato" }]}>
              <Text style={styles.holidayname}>Vijaya Dashmi</Text>
              <Text style={styles.holidaytime}>October 26, Monday</Text>
            </View>
          </TouchableOpacity>
          {/* 9 ends */}
          {/* 10 starts */}
          <TouchableOpacity
            onPress={() =>
              itemAction({
                // type: "success",
                message:
                  "Christmas is an annual festival commemorating the birth of Jesus Christ, observed primarily on December 25.",
                title: "Chrismas",
              })
            }
          >
            <View
              style={[
                styles.section,
                { backgroundColor: "orange", marginBottom: ht * 0.2 },
              ]}
            >
              <Text style={styles.holidayname}>Chrismas</Text>
              <Text style={styles.holidaytime}>December 25, Friday</Text>
            </View>
          </TouchableOpacity>
          {/* 10 ends */}
        </ScrollView>
      </View>
      {/* Holiday lists ends */}
      <DropdownAlert
        ref={(ref) => setDropDown(ref)}
        showCancel={true}
        onClose={(data) => handleClose(data)}
        onCancel={(data) => handleCancel(data)}
      />
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  scroll: {
    alignItems: "center",
    marginBottom: ht * 0.13,
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
