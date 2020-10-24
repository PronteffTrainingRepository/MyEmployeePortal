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
  Modal,
  TouchableHighlight,
} from "react-native";
import Axios from "axios";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../firebase";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [mod1, setMod1] = useState("");
  const [mod2, setMod2] = useState("");
  const [mod3, setMod3] = useState("");
  const [mod4, setMod4] = useState("");
  const [mod5, setMod5] = useState("");
  const [mod6, setMod6] = useState("");
  console.log(code);
  const setChangePassword = async () => {
    let no = phoneno.substr(3, 12);

    if (newpassword === confirmpassword) {
      Axios.post(`http://183.83.219.220:5000/user/resetPassword/`, {
        empId: `${empid}`,
        comfirmPassword: `${confirmpassword}`,
        empPhoneNum: `${no}`,
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
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneno, recaptchaVerifier.current)
      .then(setVerificationId);
  };
  const addCode = () => {
    let data = mod1 + mod2 + mod3 + mod4 + mod5 + mod6;
    setCode(data);
    confirmCode(data);
    console.log("code", code);
  };
  const confirmCode = (data) => {
    console.log(data);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      data
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        setChangePassword();
      });
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
  const modal1 = useRef();
  const modal2 = useRef();
  const modal3 = useRef();
  const modal4 = useRef();
  const modal5 = useRef();
  const modal6 = useRef();
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Login1")}
            >
              <AntDesign name="arrowleft" size={28} color="black" />
            </TouchableOpacity>

            {/* Form Starts */}
            <View
              style={{
                marginTop: ht * 0.05,
                flex: 1,
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
                  keyboardType="phone-pad"
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
                  // onPress={setChangePassword}
                  onPress={() => {
                    if (
                      empid == "" ||
                      phoneno == "" ||
                      newpassword == "" ||
                      confirmpassword == ""
                    ) {
                      alert("All fields must be filled");
                    } else {
                      if (newpassword == confirmpassword) {
                        sendVerification();
                        setModalVisible(true);
                      } else {
                        alert("New password and confirm password are not same");
                      }
                    }
                  }}
                >
                  <Text style={styles.buttontext}>Submit</Text>
                </TouchableOpacity>
              </View>
              {/* Submit Button Ends */}
            </View>
            {/* Form Ends */}
            {/* Modal Starts */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              // onRequestClose={() => {
              //   Alert.alert("Modal has been closed.");
              // }}
            >
              {/* Modal full screen starts */}

              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  // opacity: 0.8,
                }}
              >
                <ImageBackground
                  source={require("../assets/splash2.png")}
                  style={{ flex: 1, resizeMode: "cover" }}
                >
                  {/* Modal Starts */}
                  <View style={styles.modal}>
                    <View>
                      <Text
                        style={[
                          styles.modalinputtext,
                          {
                            paddingLeft: wd * 0.05,
                            paddingTop: wd * 0.01,
                            fontWeight: "bold",
                            fontSize: ht * 0.025,
                          },
                        ]}
                      >
                        Enter OTP
                      </Text>
                    </View>
                    {/* Modal Form Starts */}
                    <View style={styles.modalform}>
                      <View style={styles.modalinputview}>
                        <TextInput
                          style={styles.modalinput}
                          ref={modal1}
                          onChangeText={(text) => setMod1(text)}
                          Value={mod1}
                          autoFocus={true}
                          onKeyPress={() => modal2.current.focus()}
                          keyboardType="number-pad"
                          maxLength={1}
                        />
                      </View>
                      <View style={styles.modalinputview}>
                        <TextInput
                          style={styles.modalinput}
                          ref={modal2}
                          onChangeText={(text) => setMod2(text)}
                          Value={mod2}
                          onKeyPress={() => modal3.current.focus()}
                          keyboardType="number-pad"
                          maxLength={1}
                        />
                      </View>
                      <View style={styles.modalinputview}>
                        <TextInput
                          style={styles.modalinput}
                          ref={modal3}
                          onChangeText={(text) => setMod3(text)}
                          Value={mod3}
                          keyboardType="number-pad"
                          onKeyPress={() => modal4.current.focus()}
                          maxLength={1}
                        />
                      </View>
                      <View style={styles.modalinputview}>
                        <TextInput
                          style={styles.modalinput}
                          ref={modal4}
                          onChangeText={(text) => setMod4(text)}
                          Value={mod4}
                          keyboardType="number-pad"
                          onKeyPress={() => modal5.current.focus()}
                          maxLength={1}
                        />
                      </View>
                      <View style={styles.modalinputview}>
                        <TextInput
                          style={styles.modalinput}
                          ref={modal5}
                          onChangeText={(text) => setMod5(text)}
                          Value={mod5}
                          keyboardType="number-pad"
                          onKeyPress={() => modal6.current.focus()}
                          maxLength={1}
                        />
                      </View>
                      <View style={styles.modalinputview}>
                        <TextInput
                          style={styles.modalinput}
                          ref={modal6}
                          onChangeText={(text) => setMod6(text)}
                          Value={mod6}
                          keyboardType="number-pad"
                          maxLength={1}
                          onKeyPress={() => Keyboard.dismiss()}
                        />
                      </View>
                    </View>
                    {/* Modal Forms Ends */}

                    {/* Modal Buttons Starts */}

                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                      {/* Resend button starts */}

                      <TouchableOpacity
                        onPress={() => alert("hello")}
                        style={{
                          // backgroundColor: "red",
                          position: "relative",
                          top: ht * 0.001,
                          height: ht * 0.066,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            textAlign: "center",
                            height: ht * 0.066,
                            textAlignVertical: "center",
                            fontSize: 20,
                            color: "#9061A8",
                            fontWeight: "700",
                          }}
                        >
                          Resend OTP
                        </Text>
                      </TouchableOpacity>

                      {/* Resend button Ends */}
                      <View style={styles.modalclose}>
                        <TouchableHighlight
                          onPress={() => {
                            setModalVisible(false);
                          }}
                          style={{
                            borderRightWidth: wd * 0.001,
                            borderColor: "white",
                            flex: 1,
                            paddingTop: ht * 0.01,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "700",
                              fontSize: ht * 0.03,
                              textAlign: "center",
                            }}
                          >
                            Dismiss
                          </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                          style={{ flex: 1 }}
                          onPress={() => {
                            addCode();
                            // alert(code);
                            // confirmCode();
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "700",
                              fontSize: ht * 0.03,
                              textAlign: "center",
                              paddingTop: ht * 0.01,
                            }}
                          >
                            Submit
                          </Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                    {/* Modal Buttons Ends */}
                  </View>
                  {/* modal ends */}
                </ImageBackground>
              </View>
              {/* Modal full screen ends */}
            </Modal>
            {/* Modal Ends */}
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={firebase.app().options}
            />
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
  modal: {
    position: "absolute",
    top: ht * 0.3,
    left: wd * 0.15,
    backgroundColor: "white",
    elevation: 5,
    height: ht * 0.27,
    width: wd * 0.74,
    borderRadius: ht * 0.01,
  },
  modalclose: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    backgroundColor: "#3498DB",
    height: ht * 0.07,
    borderBottomLeftRadius: ht * 0.01,
    borderBottomRightRadius: ht * 0.01,
    // paddingTop: ht * 0.005,
  },
  modalinput: {
    width: wd * 0.1,
    borderWidth: wd * 0.003,
    paddingLeft: wd * 0.03,
    height: ht * 0.055,
    fontWeight: "bold",
    fontSize: ht * 0.03,
  },
  modalinputtext: {
    color: "#9061A8",
    fontWeight: "700",
    paddingBottom: ht * 0.02,
  },
  modalinputview: {
    flex: 1,
  },
  modalform: {
    flex: 5,
    flexDirection: "row",
    paddingLeft: wd * 0.04,
    paddingTop: ht * 0.02,
  },
});
