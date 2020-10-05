import React, { useState, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../firebase";

const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;

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
        navigation.navigate("DrawerScreen");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Heading Starts */}
      <View style={styles.headerview}>
        <Text style={styles.heading}>MY Employee Portal</Text>
      </View>
      {/* Heading Ends */}
      {/* Name Starts */}
      <View style={styles.block}>
        <View>
          <Text style={styles.inputname}>Name</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setName(text)}
            value={name}
            autoFocus
          />
        </View>
      </View>
      {/* Name Ends */}

      {/* Mobile Number Starts */}
      <View style={styles.block}>
        <View>
          <Text style={styles.inputname}>Mobile No</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNo(text)}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            value={no}
          />
        </View>
        {/* Login Button STarts */}
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity
            style={[styles.button, { width: wd * 0.35 }]}
            onPress={() => {
              if (no == "") {
                alert("Phone Number field Can't be empty...");
              } else if (name == "") {
                alert("please Enter Your Name");
              } else {
                sendVerification();
              }
            }}
          >
            <Text style={styles.buttontext}>Submit Number</Text>
          </TouchableOpacity>
        </View>
        {/* Login Button Ends */}
      </View>
      {/* Mobile Number Ends */}

      {/* Otp Starts */}
      <View style={styles.block}>
        <View>
          <Text style={styles.inputname}>OTP Code</Text>
        </View>
        <View>
          <TextInput
            keyboardType="phone-pad"
            autoCompleteType="tel"
            style={styles.input}
            onChangeText={(text) => setCode(text)}
            value={code}
          />
        </View>
      </View>
      {/* Otp Ends */}

      {/* Login Button STarts */}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (no == "") {
              alert("Enter Phone number First...");
            } else if (code == "") {
              alert("OTP Field is Empty...");
            } else if (name == "") {
              alert("please Enter Your Name");
            } else {
              confirmCode();
            }
          }}
        >
          <Text style={styles.buttontext}>Submit OTP</Text>
        </TouchableOpacity>
      </View>
      {/* Login Button Ends */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    flex: 1,
    paddingTop: ht * 0.1,
  },
  heading: {
    color: "orange",
    fontWeight: "bold",
    fontSize: ht * 0.07,
    // paddingTop: ht * 0.2,
    textAlign: "center",
    height: ht * 0.15,
    textAlignVertical: "center",
    width: wd * 0.4,
    elevation: 5,
  },
  headerview: {
    backgroundColor: "black",
    borderRadius: ht * 0.02,
    height: ht * 0.15,
  },
  block: {
    // flex: 1,
  },
  input: {
    width: wd * 0.4,
    height: ht * 0.1,
    borderWidth: wd * 0.001,
    borderRadius: ht * 0.01,
    borderColor: "white",
    paddingLeft: wd * 0.02,
    color: "white",
    fontSize: ht * 0.05,
    fontWeight: "600",
  },
  inputname: {
    fontWeight: "bold",
    color: "yellow",
    marginTop: ht * 0.07,
    paddingBottom: ht * 0.02,
  },
  button: {
    backgroundColor: "black",
    width: wd * 0.3,
    height: ht * 0.13,
    borderRadius: ht * 0.05,
    marginTop: ht * 0.07,
  },
  buttontext: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    height: ht * 0.13,
    textAlignVertical: "center",
    fontSize: ht * 0.08,
  },
});
