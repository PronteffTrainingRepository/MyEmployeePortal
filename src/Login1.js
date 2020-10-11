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
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

const keyboardVerticalOffset =
  Platform.OS === "android" ? ht * 0.03 : -ht * 0.1;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function Login1({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seepassword, setSeePassword] = useState(true);
  const input3 = useRef();
  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Heading Starts */}
      <DismissKeyboard>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior="position"
        >
          <View
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
              }}
            >
              <Image
                style={{ height: ht * 0.2, width: wd * 0.4 }}
                source={require("../assets/pronteff1.jpg")}
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
          </View>
          {/* Heading Ends */}
          {/* Form starts */}
          <View>
            {/* UserName Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Username:</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="silver"
                onChangeText={(text) => setUsername(text)}
                onSubmitEditing={() => input3.current.focus()}
                autoFocus={true}
                selectionColor="white"
              />
            </View>
            {/* username Ends */}
            {/* Password Starts */}
            <View style={styles.section}>
              <Text style={styles.inputtext}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="silver"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={seepassword}
                ref={input3}
                selectionColor="white"
              />
              <View
                style={{
                  position: "absolute",
                  top: ht * 0.048,
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
                onPress={() => {
                  if (name == "") {
                    alert("Name Feild Can Not Be Empty");
                  } else if (username == "") {
                    alert("username is required");
                  } else if (password == "") {
                    alert("Password Feild Can not Be Empty");
                  } else if (username == "PE017" && password == "PE017") {
                    navigation.navigate("Home");
                  } else {
                    alert("Wrong ID and Password");
                  }
                }}
                // onPress={() => navigation.navigate("Home", { naam: name })}
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
  );
}

export default Login1;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingTop: ht * 0.05,
  },
  input: {
    borderBottomWidth: wd * 0.004,
    width: wd * 0.8,
    borderRadius: ht * 0.007,
    borderColor: "silver",
    paddingLeft: wd * 0.03,
    color: "white",
    height: ht * 0.055,
  },
  inputtext: {
    color: "white",
    fontWeight: "bold",
    marginBottom: ht * 0.015,
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
