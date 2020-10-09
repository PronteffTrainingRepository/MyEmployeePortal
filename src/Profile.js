import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Profile() {
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
            <Text style={{}}>Network</Text>
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
  },
  section: {
    paddingLeft: wd * 0.06,
  },
});
