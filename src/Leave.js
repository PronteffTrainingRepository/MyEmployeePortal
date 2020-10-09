import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Leave() {
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [checkpresent, setCheckPresent] = useState();
  const [drop, setDrop] = useState(false);
  const [dropvalue, setDropValue] = useState();
  const [avoid, setAvoid] = useState(0.7);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [datefrom, setDateFrom] = useState("");
  const [dateto, setDateTo] = useState("");
  const keyboardVerticalOffset =
    Platform.OS === "android" ? -ht * avoid : -ht * 0.1;
  const check1 = () => {
    if (isSelected1 == false && isSelected2 == false) {
      setSelection1(true);
    } else if (isSelected1 == false && isSelected2 == true) {
      setSelection2(false);
      setSelection1(true);
    } else {
      setSelection1(false);
    }
  };
  const check2 = () => {
    if (isSelected2 == false && isSelected1 == false) {
      setSelection2(true);
    } else if (isSelected1 == true && isSelected2 == false) {
      setSelection1(false);
      setSelection2(true);
    } else {
      setSelection2(false);
    }
  };

  const changeDrop = (value) => {
    if (value === "1") {
      setDropValue("1");
    } else if (value === "2") {
      setDropValue("2");
    } else if (value === "3") {
      setDropValue("3");
    } else if (value === "4") {
      setDropValue("4");
    }
  };

  useEffect(() => {
    if (isSelected1 == true) {
      setCheckPresent("sick");
    } else if (isSelected2 == true) {
      setCheckPresent("casual");
    } else {
      setCheckPresent("not mentioned");
    }
  }, [isSelected1, isSelected2]);
  return (
    <View style={styles.conatiner}>
      <StatusBar />

      {/* Heading Starts */}
      <View style={styles.header}>
        <Text style={styles.headertext}>Apply for the leave</Text>
      </View>
      {/* Heading Ends */}

      <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior="position"
      >
        <TouchableWithoutFeedback onPress={() => setDrop(false)}>
          {/* Form Starts */}
          <View style={styles.form}>
            {/* Reason Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Reason</Text>
              <TextInput
                style={styles.input}
                onFocus={() => setAvoid(0.3)}
                onChangeText={(text) => setReason(text)}
                value={reason}
              />
            </View>
            {/* Reason Ends */}
            {/* Number of Days Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Days</Text>
              <TextInput
                style={[styles.input, { color: "black" }]}
                editable={false}
                value={dropvalue}
                defaultValue={"0"}
              />
              {drop ? (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: wd * 0.45,
                    height: ht * 0.25,
                    elevation: 5,
                    top: ht * 0.09,
                    left: wd * 0.45,
                    borderRadius: ht * 0.004,
                    zIndex: 2,
                    justifyContent: "center",
                    paddingLeft: wd * 0.04,
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => changeDrop("1")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingTop: ht * 0.02,
                      }}
                    >
                      1
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => changeDrop("2")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingTop: ht * 0.02,
                      }}
                    >
                      2
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => changeDrop("3")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingTop: ht * 0.02,
                      }}
                    >
                      3
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => changeDrop("4")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingTop: ht * 0.02,
                      }}
                    >
                      4
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View
                style={{
                  position: "absolute",
                  right: wd * 0.03,
                  top: ht * 0.06,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (drop == false) {
                      setDrop(true);
                    } else {
                      setDrop(false);
                    }
                  }}
                  style={{ width: wd * 0.08 }}
                >
                  <Fontisto name="caret-down" size={24} color="grey" />
                </TouchableOpacity>
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
                  onChangeText={(text) => setDateFrom(text)}
                  value={datefrom}
                />
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
                  onChangeText={(text) => setDateTo(text)}
                  value={dateto}
                />
              </View>
            </View>
            {/* From-to Ends */}
            {/* Checkbox Start */}
            <View style={[styles.section, { flexDirection: "row" }]}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text style={styles.inputtext}>Sick</Text>
                <CheckBox
                  value={isSelected1}
                  onValueChange={check1}
                  style={styles.checkbox}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text style={styles.inputtext}>Casual</Text>
                <CheckBox
                  value={isSelected2}
                  onValueChange={check2}
                  style={styles.checkbox}
                />
              </View>
            </View>
            {/* Checkbox Ends */}
            {/* Description Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Description</Text>
              <TextInput
                style={styles.description}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                onFocus={() => setAvoid(-0.1)}
                onSubmitEditing={() => setAvoid(0)}
              />
            </View>
            {/* Description Ends */}

            {/* Submit Starts */}
            <View style={[styles.section, { alignItems: "center" }]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  alert(
                    `reason : ${reason} and days : ${dropvalue} and from :${datefrom} - to :${dateto} and cause : ${checkpresent} and ${description}`
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

export default Leave;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
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
    height: ht * 0.09,
    borderWidth: wd * 0.003,
    borderColor: "grey",
    paddingLeft: wd * 0.01,
    marginTop: ht * 0.02,
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
    paddingLeft: wd * 0.03,
  },
});
