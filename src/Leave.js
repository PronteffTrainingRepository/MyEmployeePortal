import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Picker,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Leave() {
  const [description, setDescription] = useState("");
  const [datefrom, setDateFrom] = useState("");
  const [dateto, setDateTo] = useState("");
  const [selectedValue, setSelectedValue] = useState("Fever");
  const [selectedValue1, setSelectedValue1] = useState("0");

  const keyboardVerticalOffset =
    Platform.OS === "android" ? ht * 0.2 : -ht * 0.1;

  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDateFrom(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
    setDateTo(
      date.getDate() +
        Number(selectedValue1) +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear()
    );
  };
  useEffect(() => {
    setDateFrom(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
    setDateTo(
      date.getDate() +
        Number(selectedValue1) +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear()
    );
  }, [date, selectedValue1, dateto, datefrom]);

  async function getData() {
    const asynctoken = await AsyncStorage.getItem("token");
    console.log(asynctoken);
    console.log("dateto", dateto);
    console.log("datefrom", datefrom);
    console.log("days", selectedValue1);
    console.log("reason", selectedValue);
    console.log("description", description);

    await axios
      .post(
        "http://183.83.219.220:5000/user/email",

        {
          days: selectedValue1,
          datefrom: datefrom,
          dateto: dateto,
          reason: selectedValue,
          description: description,
        },
        {
          headers: {
            contentType: "application/json",
            Authorization: `Bearer ${asynctoken}`,
          },
        }
      )
      .then(async (res) => {
        console.log(res.data);
        alert(res.data.msg);
        setDescription("");
      })
      .catch((msg) => {
        alert(msg);
      });
  }

  return (
    <View style={styles.conatiner}>
      <StatusBar barStyle="light-content" backgroundColor="#022169" />

      <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior="position"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          {/* Form Starts */}
          <View style={styles.form}>
            {/* Reason Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Reason</Text>
              <View
                style={{
                  width: wd * 0.9,
                  height: ht * 0.07,
                  borderBottomWidth: wd * 0.003,
                  borderColor: "grey",
                }}
              >
                <Picker
                  selectedValue={selectedValue}
                  style={{
                    height: ht * 0.07,
                    width: wd * 0.9,
                    paddingLeft: wd * 0.01,
                    fontWeight: "bold",
                    fontSize: ht * 0.05,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                >
                  <Picker.Item label="Fever" value="Fever" />
                  <Picker.Item
                    label="Not Feeling Well"
                    value="Not Feeling Well"
                  />
                  <Picker.Item
                    label="Family Function"
                    value="Family Function"
                  />
                  <Picker.Item
                    label="Personal Reason"
                    value="Personal Reason"
                  />
                </Picker>
              </View>
            </View>
            {/* Reason Ends */}

            {/* Number of Days Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Days</Text>
              <View
                style={{
                  width: wd * 0.9,
                  height: ht * 0.07,
                  borderBottomWidth: wd * 0.003,
                  borderColor: "grey",
                }}
              >
                <Picker
                  selectedValue={selectedValue1}
                  style={{
                    height: ht * 0.07,
                    width: wd * 0.9,
                    paddingLeft: wd * 0.01,
                    fontWeight: "bold",
                    fontSize: ht * 0.05,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue1(itemValue)
                  }
                >
                  <Picker.Item label="Half Day" value="0" />
                  <Picker.Item label="1 Day" value="1" />
                  <Picker.Item label="2 Days" value="2" />
                  <Picker.Item label="3 Days" value="3" />
                </Picker>
              </View>
            </View>
            {/* Number of Days Ends */}
            {/* From-to Starts */}
            <View
              style={[
                styles.section,
                {
                  flexDirection: "row",
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.inputtext}>From</Text>
                <TextInput
                  style={styles.leave}
                  value={datefrom}
                  editable={false}
                />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date1}
                    mode={date}
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                  />
                )}
                <View
                  style={{
                    position: "absolute",
                    top: ht * 0.048,
                    left: wd * 0.33,
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => setShow(true)}
                  >
                    <Entypo name="calendar" size={24} color="#022169" />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.inputtext}>to</Text>
                <TextInput
                  style={styles.leave}
                  value={dateto}
                  editable={false}
                />

                <View
                  style={{
                    position: "absolute",
                    top: ht * 0.048,
                    left: wd * 0.33,
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      setShow(true);
                    }}
                  >
                    <Entypo name="calendar" size={24} color="#022169" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* From-to Ends */}
            {/* Description Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Description</Text>
              <TextInput
                style={styles.description}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </View>
            {/* Description Ends */}

            {/* Submit Starts */}
            <View style={[styles.section, { alignItems: "center" }]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (
                    selectedValue === "" ||
                    selectedValue1 === "" ||
                    datefrom === "" ||
                    dateto === "" ||
                    description === ""
                  ) {
                    alert("All Fields Must be Filled");
                  } else {
                    getData();
                    console.log("====================================");
                    console.log("selectedValue1", selectedValue1);
                    console.log("====================================");
                    console.log("====================================");
                    console.log("From", datefrom);
                    console.log("====================================");
                    console.log("to", dateto);
                    console.log("====================================");
                    console.log("====================================");
                    console.log("description", description);
                    console.log("====================================");
                    console.log("====================================");
                  }
                }}
              >
                <Text style={styles.buttontext}>Apply</Text>
              </TouchableOpacity>
            </View>
            {/* Submit Ends */}
          </View>
          {/* Form Ends */}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Leave;

const styles = StyleSheet.create({
  conatiner: {
    // flex: 1,expo
    backgroundColor: "white",
    // alignItems: "center",
    height: ht * 1,
  },
  form: {
    alignItems: "center",
    marginTop: ht * 0.05,
  },
  input: {
    width: wd * 0.9,
    height: ht * 0.07,
    borderBottomWidth: wd * 0.003,
    borderColor: "grey",
    paddingLeft: wd * 0.01,
    fontWeight: "bold",
    fontSize: ht * 0.03,
  },
  description: {
    width: wd * 0.9,
    height: ht * 0.13,
    borderWidth: wd * 0.003,
    borderColor: "grey",
    paddingLeft: wd * 0.02,
    marginTop: ht * 0.02,
    textAlignVertical: "top",
    paddingTop: ht * 0.01,
    borderRadius: ht * 0.004,
  },
  inputtext: {
    fontWeight: "900",
    fontSize: ht * 0.03,
  },
  checkox: {
    width: wd * 0.06,
    height: ht * 0.03,
    borderWidth: wd * 0.007,
    borderColor: "grey",
  },
  section: {
    paddingTop: ht * 0.02,
    paddingBottom: ht * 0.02,
  },
  button: {
    backgroundColor: "#0678F4",
    width: wd * 0.4,
    height: ht * 0.055,
    borderRadius: ht * 0.003,
  },
  buttontext: {
    textAlign: "center",
    textAlignVertical: "center",
    height: ht * 0.055,
    color: "white",
    fontWeight: "bold",
    fontSize: ht * 0.03,
  },
  header: {
    backgroundColor: "#022169",
    justifyContent: "center",
    alignItems: "center",
    height: ht * 0.07,
    elevation: 10,
  },
  headertext: {
    color: "white",
    fontSize: ht * 0.03,
  },
  leave: {
    width: wd * 0.3,
    height: ht * 0.05,
    borderWidth: wd * 0.003,
    paddingLeft: wd * 0.01,
    borderRadius: ht * 0.004,
    color: "black",
  },
});
