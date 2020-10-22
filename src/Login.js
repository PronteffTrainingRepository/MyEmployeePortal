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
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../firebase";

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
  const [name, setName] = useState("");
  const [no, setNo] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(no, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Do something with the results here
        alert("Successfully Login...");
        // console.log(result);
        navigation.navigate("Login1");
      });
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
                <TextInput style={styles.input} />
              </View>
              {/* Employee Id ends */}
              {/* Phone no Starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>Phone No</Text>
                <TextInput style={styles.input} />
              </View>
              {/* Phone No ends */}
              {/* New Password Starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>New Password</Text>
                <TextInput style={styles.input} />
              </View>
              {/* New Password Ends */}
              {/* Confirm Password starts */}
              <View style={styles.section}>
                <Text style={styles.inputtext}>Confirm Password</Text>
                <TextInput style={styles.input} />
              </View>
              {/* Confirm Password Ends */}
              {/* Submit Button  Starts */}
              <View style={{ alignItems: "center", marginTop: ht * 0.05 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert("hello");
                  }}
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
