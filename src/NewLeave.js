import React, { useState } from "react";
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

import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function NewLeave() {
  const [description, setDescription] = useState("");
  const [datefrom, setDateFrom] = useState("");
  const [dateto, setDateTo] = useState("");
  const [selectedValue, setSelectedValue] = useState("Sick");
  const [selectedValue1, setSelectedValue1] = useState(0);

  const keyboardVerticalOffset =
    Platform.OS === "android" ? ht * 0.2 : -ht * 0.1;

  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDateTo(selectedDate);
  };

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
                  <Picker.Item label="Sick" value="Sick" />
                  <Picker.Item label="Casual" value="Casual" />
                  <Picker.Item label="Other" value="Other" />
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
                  <Picker.Item label="0" value={0} />
                  <Picker.Item label="1" value={1} />
                  <Picker.Item label="2" value={2} />
                  <Picker.Item label="3" value={3} />
                  <Picker.Item label="4" value={4} />
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
                  value={
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()
                  }
                  editable={false}
                />
                {console.log("inside component date", date)}
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
                  value={
                    date.getDate() +
                    Number(selectedValue1) +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()
                  }
                  editable={false}
                />
                {console.log("inside component dateto", date)}
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
              />
            </View>
            {/* Description Ends */}

            {/* Submit Starts */}
            <View style={[styles.section, { alignItems: "center" }]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  alert(
                    `reason : ${reason} and days : and from :${datefrom} - to :${dateto} and cause : ${checkpresent} and ${description}`
                  )
                }
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

export default NewLeave;

const styles = StyleSheet.create({
  conatiner: {
    // flex: 1,
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
