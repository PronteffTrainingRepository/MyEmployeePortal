import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

const keyboardVerticalOffset =
  Platform.OS === "android" ? -ht * 0.25 : -ht * 0.1;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function Login1({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seepassword, setSeePassword] = useState(true);
  const [isFocused, setBorder] = useState(false);
  const [isFocused1, setBorder1] = useState(false);

  const input3 = useRef();
  const onFocusChange = () => {
    setBorder({ isFocused: true });
  };
  const onFocusChange1 = () => {
    setBorder1({ isFocused: true });
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
            {/* <View
              style={{
                // paddingLeft: wd * 0.05,
                // paddingRight: wd * 0.05,
                borderRadius: ht * 0.01,
                height: ht * 0.3,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  // backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: ht * 0.03,
                }}
              >
                <Image
                  style={{
                    height: ht * 0.2,
                    width: wd * 0.4,
                    marginBottom: ht * 0.01,
                    borderRightWidth: ht * 0.02,
                    borderColor: "grey",
                    borderWidth: wd * 0.003,
                    borderRadius: ht * 0.02,
                  }}
                  source={require("../assets/plogo.png")}
                />
                <Text
                  style={{
                    color: "#464967",
                    fontWeight: "bold",
                    fontSize: ht * 0.04,
                  }}
                >
                  Pronteff IT Solutions
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "800",
                    fontSize: ht * 0.04,
                  }}
                >
                  Welcome back!
                </Text>
              </View>
            </View> */}
            {/* Heading Ends */}
            {/* Form starts */}
            <View
              style={{
                marginTop: ht * 0.17,
                flex: 1,
                justifyContent: "center",
              }}
            >
              {/* UserName Starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>Username</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: isFocused ? "tomato" : "silver",
                      borderWidth: isFocused ? wd * 0.01 : 0.003,
                    },
                  ]}
                  placeholder="Username"
                  placeholderTextColor="silver"
                  onChangeText={(text) => setUsername(text)}
                  onSubmitEditing={() => input3.current.focus()}
                  autoFocus={true}
                  selectionColor="tomato"
                  onFocus={() => onFocusChange()}
                  onBlur={() => setBorder(false)}
                />
              </View>
              {/* username Ends */}
              {/* Password Starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: isFocused1 ? "tomato" : "silver",
                      borderWidth: isFocused1 ? wd * 0.01 : 0.003,
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor="silver"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={seepassword}
                  ref={input3}
                  onFocus={() => onFocusChange1()}
                  onBlur={() => setBorder1(false)}
                  selectionColor="tomato"
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
              {/* Password Ends */}
              {/* Submit Button  Starts */}
              <View style={{ alignItems: "center", marginTop: ht * 0.1 }}>
                <TouchableOpacity
                  style={styles.button}
                  //  onPress={() => alert(`${name} and ${username} and ${password}`)}
                  // onPress={() => {
                  //   if (username == "") {
                  //     alert("username is required");
                  //   } else if (password == "") {
                  //     alert("Password Feild Can not Be Empty");
                  //   } else if (username == "PE017" && password == "PE017") {
                  //     navigation.navigate("Main");
                  //   } else {
                  //     alert("Wrong ID and Password");
                  //   }
                  // }}
                  onPress={() => navigation.navigate("Main")}
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

export default Login1;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingTop: ht * 0.05,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: wd * 0.004,
    // borderColor: "silver",
    width: wd * 0.8,
    borderRadius: ht * 0.007,
    paddingLeft: wd * 0.03,
    color: "black",
    height: ht * 0.055,
  },
  inputtext: {
    color: "black",
    fontWeight: "bold",
    marginBottom: ht * 0.015,
    fontSize: ht * 0.025,
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
  section: {
    marginTop: ht * 0.02,
    marginBottom: ht * 0.01,
  },
});
