import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Profile() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View>
      {/* <StatusBar /> */}

      {/* Main View Starts */}
      <View style={{ height: ht * 0.47 }}>
        {/* Wallpicture Starts */}
        <View>
          <Image
            style={styles.wallpaper}
            source={require("../assets/person.jpg")}
          />
          <View style={styles.wallpapercover}></View>
          <View
            style={{ position: "absolute", top: ht * 0.25, left: wd * 0.89 }}
          >
            <TouchableOpacity>
              <Fontisto name="camera" size={24} color="silver" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Wallpicture Ends */}

        {/* Dp Starts */}
        <View
          style={{
            position: "relative",
            top: -ht * 0.11,
            left: wd * 0.34,
            // backgroundColor: "red",
          }}
        >
          <View>
            <Image style={styles.dp} source={require("../assets/person.jpg")} />
          </View>
          {/* Name Starts */}
          <View
            style={{ flex: 1, backgroundColor: "red", paddingLeft: wd * 0.05 }}
          >
            <Text style={{ fontWeight: "bold", fontSize: ht * 0.02 }}>
              AVLIN THOMUS
            </Text>
            <Text style={{ color: "grey", paddingLeft: wd * 0.07 }}>
              Network
            </Text>
          </View>
          {/* Name Ends */}
        </View>
        {/* Dp Ends */}
      </View>
      {/*  Main View Ends*/}

      {/* Scroll Starts */}
      <View style={{ marginBottom: 200 }}>
        <ScrollView style={{ height: ht * 0.5 }}>
          {/* name starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Name</Text>
            <TextInput style={styles.input} />
          </View>
          {/* name Ends */}
          {/* Emp id starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>EmpID</Text>
            <TextInput style={styles.input} />
          </View>
          {/* Emp id Ends */}
          {/* designation starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Designation</Text>
            <TextInput style={styles.input} />
          </View>
          {/* designation Ends */}
          {/* Company's Email starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Company's Email</Text>
            <TextInput style={styles.input} />
          </View>
          {/* Company's Email Ends */}
          {/* Personal Email starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Personal Email</Text>
            <TextInput style={styles.input} />
          </View>
          {/* Personla Email Ends */}
          {/* Mobile number starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Mobile Number</Text>
            <TextInput style={styles.input} />
          </View>
          {/* Mobile Number Ends */}
          {/* Change Password Starts */}
          <View style={styles.buttonview}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttontext}>Change Password</Text>
            </TouchableOpacity>
          </View>
          {/* Change Password Ends */}
        </ScrollView>
      </View>
      {/* Scroll Ends */}
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  wallpaper: {
    width: wd * 1,
    height: ht * 0.3,
  },
  wallpapercover: {
    position: "absolute",
    width: wd * 1,
    height: ht * 0.3,
    backgroundColor: "#AB79C6",
    opacity: 0.7,
  },
  dp: {
    width: wd * 0.4,
    height: ht * 0.2,
    borderRadius: ht * 0.1,
    borderWidth: wd * 0.01,
    borderColor: "white",
  },
  input: {
    width: wd * 0.94,
    borderBottomWidth: wd * 0.003,
    borderColor: "grey",
    height: ht * 0.05,
    paddingLeft: wd * 0.02,
  },
  inputtitle: {
    color: "#9061A8",
    paddingTop: ht * 0.02,
    fontWeight: "bold",
    marginBottom: ht * 0.005,
  },
  section: {
    paddingLeft: wd * 0.06,
  },
  buttonview: {
    alignItems: "center",
    marginTop: ht * 0.04,
  },
  button: {
    backgroundColor: "#9061A8",
    width: wd * 0.45,
    height: ht * 0.05,
    borderRadius: ht * 0.02,
  },
  buttontext: {
    color: "white",
    textAlign: "center",
    height: ht * 0.05,
    textAlignVertical: "center",
    fontWeight: "bold",
  },
});
