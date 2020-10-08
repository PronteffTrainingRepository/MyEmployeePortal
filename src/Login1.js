import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Login1({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seepassword, setSeePassword] = useState(true);
  const input2 = useRef();
  const input3 = useRef();
  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Heading Starts */}
      <View
        style={{
          backgroundColor: "tomato",
          paddingLeft: wd * 0.05,
          paddingRight: wd * 0.05,
          borderRadius: ht * 0.01,
          height: ht * 0.08,
          marginBottom: ht * 0.02,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: ht * 0.05,
            fontWeight: "bold",
            marginBottom: ht * 0.05,
            height: ht * 0.08,
            textAlignVertical: "center",
          }}
        >
          Login Form
        </Text>
      </View>
      {/* Heading Ends */}
      {/* Form starts */}
      <View>
        {/* Name Starts */}
        <View style={styles.section}>
          <Text style={styles.inputtext}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="pink"
            onChangeText={(text) => setName(text)}
            autoFocus={true}
            // maxLength={1}
            onSubmitEditing={() => {
              if (name == "") {
                alert("Name Feild Can't be Empty");
              } else {
                input2.current.focus();
              }
            }}
            selectionColor="white"
          />
        </View>
        {/* Name Ends */}
        {/* UserName Starts */}
        <View style={styles.section}>
          <Text style={styles.inputtext}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Username"
            placeholderTextColor="pink"
            onChangeText={(text) => setUsername(text)}
            onSubmitEditing={() => input3.current.focus()}
            ref={input2}
            selectionColor="white"
          />
        </View>
        {/* username Ends */}
        {/* Password Starts */}
        <View style={styles.section}>
          <Text style={styles.inputtext}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            placeholderTextColor="pink"
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
                <AntDesign name="eye" size={30} color="white" />
              ) : (
                <Entypo name="eye-with-line" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Password Ends */}
        {/* Submit Button  Starts */}
        <View style={{ alignItems: "center", marginTop: ht * 0.02 }}>
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
                navigation.navigate("Home", { naam: name });
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
    </View>
  );
}

export default Login1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
    alignItems: "center",
    flex: 1,
    paddingTop: ht * 0.05,
  },
  input: {
    borderWidth: wd * 0.007,
    width: wd * 0.8,
    borderRadius: ht * 0.007,
    borderColor: "tomato",
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
    width: wd * 0.5,
    height: ht * 0.06,
    backgroundColor: "black",
    borderRadius: ht * 0.02,
  },
  buttontext: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    height: ht * 0.06,
    fontWeight: "bold",
    fontSize: ht * 0.04,
  },
  section: {
    marginTop: ht * 0.02,
    marginBottom: ht * 0.01,
  },
});
