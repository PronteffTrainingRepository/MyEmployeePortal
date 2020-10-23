import React, { useState, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import Axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const keyboardVerticalOffset =
  Platform.OS === "android" ? -ht * 0.25 : -ht * 0.1;

function Login({ navigation }) {
  const [seepassword, setSeePassword] = useState(true);
  const [seepassword1, setSeePassword1] = useState(true);
  const [isFocused, setBorder] = useState(false);
  const [isFocused1, setBorder1] = useState(false);
  const [isFocused2, setBorder2] = useState(false);
  const [isFocused3, setBorder3] = useState(false);
  const [empid, setEmpId] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const setChangePassword = async () => {
    if (newpassword === confirmpassword) {
      Axios.post(`http://183.83.219.220:5000/user/resetPassword/`, {
        empId: `${empid}`,
        comfirmPassword: `${confirmpassword}`,
        empPhoneNum: `${phoneno}`,
        newPassword: `${newpassword}`,
      })
        .then((res) => {
          if (res.data.status === 200) {
            alert(res.data.msg);
            navigation.navigate("Login1");
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("New Password and Confirm Password are not same");
    }
  };

  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const onFocusChange = () => {
    setBorder({ isFocused: true });
  };
  const onFocusChange1 = () => {
    setBorder1({ isFocused1: true });
  };
  const onFocusChange2 = () => {
    setBorder2({ isFocused2: true });
  };
  const onFocusChange3 = () => {
    setBorder3({ isFocused3: true });
  };
  return (
    <ImageBackground
      source={require("../assets/splash2.png")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <View style={styles.container}>
        <StatusBar />
        {/* Heading Starts */}

        <DismissKeyboard>
          <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior="position"
          >
            {/* Form Starts */}
            <View
              style={{
                marginTop: ht * 0.05,
                flex: 1,
                // justifyContent: "center",
              }}
            >
              {/* Employee id Starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>Employee Id</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: isFocused ? "tomato" : "silver",
                      borderWidth: isFocused ? wd * 0.01 : 0.003,
                    },
                  ]}
                  onChangeText={(text) => setEmpId(text)}
                  value={empid}
                  onSubmitEditing={() => input1.current.focus()}
                  placeholder="Employee Id"
                  placeholderTextColor="silver"
                  onFocus={() => onFocusChange()}
                  onBlur={() => setBorder(false)}
                />
              </View>
              {/* Employee Id ends */}
              {/* Phone no Starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>Phone No</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: isFocused1 ? "tomato" : "silver",
                      borderWidth: isFocused1 ? wd * 0.01 : 0.003,
                    },
                  ]}
                  onChangeText={(text) => setPhoneNo(text)}
                  value={phoneno}
                  keyboardType="number-pad"
                  ref={input1}
                  onSubmitEditing={() => input2.current.focus()}
                  placeholder="Phone no"
                  placeholderTextColor="silver"
                  onFocus={() => onFocusChange1()}
                  onBlur={() => setBorder1(false)}
                />
              </View>
              {/* Phone No ends */}
              {/* New Password Starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>New Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: isFocused2 ? "tomato" : "silver",
                      borderWidth: isFocused2 ? wd * 0.01 : 0.003,
                    },
                  ]}
                  onChangeText={(text) => setNewPassword(text)}
                  value={newpassword}
                  secureTextEntry={seepassword}
                  ref={input2}
                  onSubmitEditing={() => input3.current.focus()}
                  placeholder="New Password"
                  placeholderTextColor="silver"
                  onFocus={() => onFocusChange2()}
                  onBlur={() => setBorder2(false)}
                />
                <View
                  style={{
                    position: "absolute",
                    top: ht * 0.055,
                    right: wd * 0.05,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (seepassword === true) {
                        setSeePassword(false);
                      } else {
                        setSeePassword(true);
                      }
                    }}
                  >
                    {seepassword === true ? (
                      <AntDesign name="eye" size={30} color="grey" />
                    ) : (
                      <Entypo name="eye-with-line" size={24} color="grey" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* New Password Ends */}
              {/* Confirm Password starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>Confirm Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: isFocused3 ? "tomato" : "silver",
                      borderWidth: isFocused3 ? wd * 0.01 : 0.003,
                    },
                  ]}
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmpassword}
                  secureTextEntry={seepassword1}
                  ref={input3}
                  placeholder="Confirm Password"
                  placeholderTextColor="silver"
                  onFocus={() => onFocusChange3()}
                  onBlur={() => setBorder3(false)}
                />
                <View
                  style={{
                    position: "absolute",
                    top: ht * 0.055,
                    right: wd * 0.05,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (seepassword1 === true) {
                        setSeePassword1(false);
                      } else {
                        setSeePassword1(true);
                      }
                    }}
                  >
                    {seepassword1 === true ? (
                      <AntDesign name="eye" size={30} color="grey" />
                    ) : (
                      <Entypo name="eye-with-line" size={24} color="grey" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Confirm Password Ends */}
              {/* Submit Button  Starts */}
              <View style={{ alignItems: "center", marginTop: ht * 0.05 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={setChangePassword}
                >
                  <Text style={styles.buttontext}>Submit</Text>
                </TouchableOpacity>
              </View>
              {/* Submit Button Ends */}
            </View>
            {/* Form Ends */}
          </KeyboardAvoidingView>
        </DismissKeyboard>
      </View>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // flex: 1,
    paddingTop: ht * 0.05,
    // justifyContent: "center",
  },
  input: {
    borderBottomWidth: wd * 0.004,
    // borderColor: "silver",
    width: wd * 0.8,
    borderRadius: ht * 0.007,
    paddingLeft: wd * 0.03,
    color: "#000000",
    height: ht * 0.055,
  },
  inputtext: {
    color: "black",
    fontWeight: "bold",
    marginBottom: ht * 0.015,
    fontSize: ht * 0.025,
  },
  section: {
    marginTop: ht * 0.02,
    marginBottom: ht * 0.01,
  },
  button: {
    width: wd * 0.7,
    height: ht * 0.07,
    backgroundColor: "#464967",
    borderRadius: ht * 0.03,
  },
  buttontext: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    height: ht * 0.07,
    fontWeight: "bold",
    fontSize: ht * 0.04,
  },
});
