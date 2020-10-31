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
  ImageBackground,
  Modal,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Leave() {
  const [description, setDescription] = useState("");
  const [datefrom, setDateFrom] = useState("");
  const [dateto, setDateTo] = useState("");
  const [selectedValue, setSelectedValue] = useState("Fever");
  const [selectedValue1, setSelectedValue1] = useState("0");
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [empdetails, setempdetails] = useState([]);
  const [fields, setfields] = useState([
    {
      cc: "",
    },
  ]);

  const keyboardVerticalOffset =
    Platform.OS === "android" ? ht * 0.2 : -ht * 0.1;

  const [selectedemail, setSelectedEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    // setDateFrom(
    //   date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    // );
    // setDateTo(
    //   date.getDate() +
    //     Number(selectedValue1) +
    //     "/" +
    //     (date.getMonth() + 1) +
    //     "/" +
    //     date.getFullYear()
    // );
  };
  useEffect(() => {
    let day = date.getDate() + Number(selectedValue1);
    let month = date.getMonth();
    if (day > 30 && (month == 3 || month == 5 || month == 8 || month == 10)) {
      console.log("hello");
      month = month + 1;
      day = day - date.getDate();
      if (day == 0) {
        day = 1;
      }
    } else if (
      day > 31 &&
      (month == 0 ||
        month == 2 ||
        month == 4 ||
        month == 6 ||
        month == 7 ||
        month == 9 ||
        month == 11)
    ) {
      month = month + 1;
      day = day - date.getDate();
      if (day == 0) {
        day = 1;
      }
    } else if (day > 28 && month == 1) {
      month = month + 1;
      day = day - date.getDate();
      if (day == 0) {
        day = 1;
      }
    }
    setDateFrom(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
    setDateTo(day + "/" + (month + 1) + "/" + date.getFullYear());
    return () => {
      setDateTo("");
      setDateFrom("");
    };
  }, [date, selectedValue1, dateto, datefrom]);

  async function getData() {
    const asynctoken = await AsyncStorage.getItem("token");
    console.log(asynctoken);
    console.log("dateto", dateto);
    console.log("datefrom", datefrom);
    console.log("days", selectedValue1);
    console.log("reason", selectedValue);
    console.log("description", description);
    // if (selectedValue == 0) {
    //   setselectedValue1("Half Day");
    // }

    await axios
      .post(
        "http://183.83.219.220:5000/user/email",

        {
          days: selectedValue1 == 0 ? "Half Day" : selectedValue1,
          datefrom: datefrom,
          dateto: dateto,
          reason: selectedValue,
          description: description,
          selectedemail,
          fields,
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
        setSelectedValue("Fever");
        setSelectedValue1("0");
        setDateFrom(new Date());
      })
      .catch((msg) => {
        alert(msg);
      });
  }

  const addingCC = () => {
    setfields([...fields, { cc: "" }]);
  };

  const deleteCC = (index) => {
    let x = [...fields];

    x.splice(index, 1);
    setfields([...x]);
  };
  const handleInputChange = (text, index) => {
    console.log(text);
    let list = [...fields];
    list[index] = text;
    setfields(list);
  };
  useEffect(() => {
    getUserEmail();
  }, []);

  async function getUserEmail() {
    const asynctoken = await AsyncStorage.getItem("token");
    await axios
      .get("http://183.83.219.220:5000/user/", {
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      })
      .then(async (res) => {
        setempdetails(res.data.user);
      })
      .catch((msg) => {
        alert(msg);
      });
  }
  // console.log(empdetails);
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
                    // height: ht * 0.002,
                    // width: wd * 0.9,
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
                // onPress={() => {
                //   if (
                //     selectedValue === "" ||
                //     selectedValue1 === "" ||
                //     datefrom === "" ||
                //     dateto === "" ||
                //     description === ""
                //   ) {
                //     alert("All Fields Must be Filled");
                //   } else {
                //     getData();
                //   }
                // }}
                onPress={() => {
                  if (
                    selectedValue === "" ||
                    selectedValue1 === "" ||
                    datefrom === "" ||
                    dateto === "" ||
                    description === ""
                  ) {
                    alert("Fill the the Fields");
                  } else {
                    setModalVisible(true);
                  }
                }}
              >
                <Text style={styles.buttontext}>Apply</Text>
              </TouchableOpacity>
            </View>
            {/* Submit Ends */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                }}
              >
                <ImageBackground
                  source={require("../assets/splash4.png")}
                  style={{ flex: 1, resizeMode: "cover" }}
                >
                  <View style={styles.modalform}>
                    <View
                      style={[
                        styles.modalinputview,
                        { alignSelf: "center", marginBottom: ht * 0.02 },
                      ]}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: ht * 0.03,
                          marginBottom: ht * 0.005,
                          color: "#464967",
                        }}
                      >
                        To:
                      </Text>
                      {/* <TextInput style={styles.modalinput} /> */}
                      <View style={styles.picker}>
                        <Picker
                          selectedValue={selectedemail}
                          onValueChange={(itemValue) =>
                            setSelectedEmail(itemValue)
                          }
                          style={styles.modalinput}
                          mode="dropdown"
                        >
                          <Picker.Item
                            color="#464967"
                            label="- - - Select Name - - -"
                            value=""
                          />
                          {empdetails.map((details, index) => (
                            <Picker.Item
                              color="#464967"
                              key={index}
                              label={details.empName}
                              value={details.officeEmail}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View
                      style={[styles.modalinputview, { alignSelf: "center" }]}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: ht * 0.03,
                          marginBottom: ht * 0.005,
                          color: "#464967",
                        }}
                      >
                        Cc:
                      </Text>

                      {fields.map((item, index) => {
                        return (
                          <View key={index} style={{ alignSelf: "center" }}>
                            {/* <TextInput
                              style={[
                                styles.modalinput,
                                { marginBottom: index == 0 ? ht * 0.025 : 0 },
                              ]}
                              value={item}
                              onChangeText={(text) =>
                                handleInputChange(text, index)
                              }
                            /> */}
                            <View
                              style={[
                                styles.picker,
                                { marginBottom: index == 0 ? ht * 0.025 : 0 },
                              ]}
                            >
                              <Picker
                                selectedValue={item}
                                onValueChange={(itemValue) =>
                                  handleInputChange(itemValue, index)
                                }
                                style={styles.modalinput}
                                mode="dropdown"
                              >
                                <Picker.Item
                                  color="#464967"
                                  label="- - - Select Name - - -"
                                  value=""
                                />
                                {empdetails.map((details, index) => (
                                  <Picker.Item
                                    color="#464967"
                                    key={index}
                                    label={details.empName}
                                    value={details.officeEmail}
                                  />
                                ))}
                              </Picker>
                            </View>
                            {index > 0 ? (
                              <TouchableOpacity
                                onPress={() => deleteCC(index)}
                                style={{
                                  position: "relative",
                                  top: -ht * 0.045,
                                  left: wd * 0.62,
                                }}
                              >
                                <AntDesign
                                  name="minuscircle"
                                  size={24}
                                  color="black"
                                />
                              </TouchableOpacity>
                            ) : null}
                          </View>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      onPress={addingCC}
                      style={
                        {
                          // backgroundColor: "red",
                        }
                      }
                    >
                      <AntDesign
                        name="pluscircle"
                        size={28}
                        color="black"
                        style={{
                          alignSelf: "flex-end",
                          marginRight: wd * 0.04,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalbutton, { alignSelf: "center" }]}
                      onPress={() => {
                        if (
                          selectedValue === "" ||
                          selectedValue1 === "" ||
                          datefrom === "" ||
                          dateto === "" ||
                          description === "" ||
                          selectedemail === "" ||
                          fields === ""
                        ) {
                          alert("All Fields Must be Filled");
                        } else {
                          getData();
                          setModalVisible(false);
                          setSelectedEmail("");
                          setfields([
                            {
                              cc: "",
                            },
                          ]);
                        }
                      }}
                    >
                      <Text style={styles.modalbuttontext}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={[styles.modalbutton, { alignSelf: "center" }]}
                    >
                      <Text style={styles.modalbuttontext}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </Modal>
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
  modalinput: {
    width: wd * 0.7,
    borderWidth: wd * 0.004,
    paddingLeft: wd * 0.03,
    height: ht * 0.055,
    fontWeight: "600",
    fontSize: ht * 0.025,
  },
  picker: {
    width: wd * 0.7,
    borderWidth: wd * 0.004,
    paddingLeft: wd * 0.01,
    height: ht * 0.055,
    fontWeight: "600",
    fontSize: ht * 0.025,
  },
  modalinputview: {
    justifyContent: "center",
  },
  modalform: {
    flex: 1,
    // paddingLeft: wd * 0.04,
    paddingTop: ht * 0.02,
    justifyContent: "center",
    // alignItems: "center",
  },
  modalButtoncontainer: {
    // backgroundColor: "red",
    alignItems: "center",
    flex: 2,
    justifyContent: "flex-start",
  },
  modalbutton: {
    width: wd * 0.7,
    height: ht * 0.07,
    backgroundColor: "#464967",
    borderRadius: ht * 0.03,
    marginTop: ht * 0.03,
  },
  modalbuttontext: {
    color: "white",
    textAlign: "center",
    height: ht * 0.07,
    textAlignVertical: "center",
    fontWeight: "700",
    fontSize: ht * 0.03,
  },
});
