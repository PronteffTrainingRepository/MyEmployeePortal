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
  Modal,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Profile1({ navigation }) {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState();
  const [empId, setEmpId] = useState();
  const [designation, setdesignation] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [personalEmail, setPersonalEmail] = useState();
  const [mobileno, setMobileNo] = useState("");
  const [photo, setPhoto] = useState();
  const [modalempid, setModalEmpId] = useState("");
  const [modalphoneno, setModalPhoneNO] = useState("");
  const [modalnewpassword, setModalNewPassword] = useState("");
  const [modalconfirmpassword, setModalConfirmPassword] = useState("");
  const [dateofjoin, setDateOfJoined] = useState();
  const [dateofbirth, setDateOfBirth] = useState();
  const [department, setDepartment] = useState();
  const [sendimage, setSendImage] = useState();

  const choose = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        // base64: true,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };

        setImage(data.uri);
        sendServerImage(newFile);
      }
    } else {
      Alert("pleas select give permission");
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const sendServerImage = async (newFile) => {
    const asyncuser = await AsyncStorage.getItem("user");
    let User = JSON.parse(asyncuser);

    const asynctoken = await AsyncStorage.getItem("token");
    const data = new FormData();
    data.append("file", newFile);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "dxif90ym7");
    fetch("https://api.cloudinary.com/v1_1/dxif90ym7/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setSendImage(data.url);
        if (data.url) {
          Axios.post(
            `http://183.83.219.220:5000/user/profilePicChange/${User._id}`,
            {
              photo: data.url,
            },
            {
              headers: {
                contentType: "multipart/form-data",
                Authorization: `Bearer ${asynctoken}`,
              },
            }
          )
            .then((res) => {
              console.log("responsee", res.data);
            })
            .catch((err) => {
              alert("i am in catch block ", err);
            });
        }
      });
  };

  const GetData = async () => {
    const asyncuser = await AsyncStorage.getItem("user");
    let User = JSON.parse(asyncuser);
    const asynctoken = await AsyncStorage.getItem("token");
    Axios.get(`http://183.83.219.220:5000/user/getUser/${User._id}`, {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    })
      .then((res) => {
        setName(res.data.user.empName);
        setEmpId(res.data.user.empId);
        setdesignation(res.data.user.designation);
        setDateOfJoined(res.data.user.dateOfJoin);
        setCompanyEmail(res.data.user.officeEmail);
        setPersonalEmail(res.data.user.personnelEmail);
        let a = res.data.user.empPhoneNum.slice(0, 3);
        let b = res.data.user.empPhoneNum.slice(9);
        setMobileNo(`${a}******${b}`);
        setDateOfBirth(res.data.user.DOB);
        setPhoto(res.data.user.photo);
        setDepartment(res.data.user.department);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const setChangePassword = async () => {
    const asynctoken = await AsyncStorage.getItem("token");
    if (modalnewpassword === modalconfirmpassword) {
      Axios.post(
        `http://183.83.219.220:5000/user/passwordReset`,
        {
          empId: `${modalempid}`,
          comfirmPassword: `${modalconfirmpassword}`,
          empPhoneNum: `${modalphoneno}`,
          newPassword: `${modalnewpassword}`,
        },
        {
          headers: {
            contentType: "application/json",
            Authorization: `Bearer ${asynctoken}`,
          },
        }
      )
        .then((res) => {
          alert(res.data.msg);
          if (res.data.status === 200) {
            setModalVisible(false);
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("New Password and Confirm Password are not same");
    }
  };

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#AB79C6" />

      {/* Main View Starts */}
      <View style={{ height: ht * 0.47 }}>
        {/* Wallpicture Starts */}
        {image == null ? (
          <View>
            <Image
              style={styles.wallpaper}
              source={{
                uri: `${photo}`,
              }}
            />
            <View style={styles.wallpapercover}></View>
            <View
              style={{ position: "absolute", top: ht * 0.04, left: wd * 0.42 }}
            >
              <Text
                style={{
                  color: "silver",
                  fontWeight: "bold",
                  fontSize: ht * 0.03,
                }}
              >
                Profile
              </Text>
            </View>
            <View
              style={{ position: "absolute", top: ht * 0.25, left: wd * 0.89 }}
            >
              <TouchableOpacity onPress={pickImage}>
                <Fontisto name="camera" size={24} color="silver" />
              </TouchableOpacity>
            </View>
            <View
              style={{ position: "absolute", top: ht * 0.01, left: wd * 0.03 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <AntDesign name="arrowleft" size={30} color="silver" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Image style={styles.wallpaper} source={{ uri: image }} />
            <View style={styles.wallpapercover}></View>
            <View
              style={{ position: "absolute", top: ht * 0.04, left: wd * 0.42 }}
            >
              <Text
                style={{
                  color: "silver",
                  fontWeight: "bold",
                  fontSize: ht * 0.03,
                }}
              >
                Profile
              </Text>
            </View>
            <View
              style={{ position: "absolute", top: ht * 0.25, left: wd * 0.89 }}
            >
              <TouchableOpacity onPress={pickImage}>
                <Fontisto name="camera" size={24} color="silver" />
              </TouchableOpacity>
            </View>
            <View
              style={{ position: "absolute", top: ht * 0.01, left: wd * 0.03 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <AntDesign name="arrowleft" size={30} color="silver" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Wallpicture Ends */}

        {/* Dp Starts */}
        <View
          style={{
            position: "absolute",
            top: ht * 0.19,
            left: wd * 0.315,
            // backgroundColor: "red",
            alignItems: "center",
          }}
        >
          {image == null ? (
            <View>
              <Image
                style={styles.dp}
                source={{
                  uri: `${photo}`,
                }}
              />
            </View>
          ) : (
            <View>
              <Image style={styles.dp} source={{ uri: image }} />
            </View>
          )}
        </View>
        {/* Dp Ends */}
        {/* Name Starts */}
        <View
          style={{
            alignItems: "center",
            paddingTop: ht * 0.085,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: ht * 0.034,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: "grey",
            }}
          >
            {department}
          </Text>
        </View>
        {/* Name Ends */}
      </View>
      {/*  Main View Ends*/}
      {/* Modal Starts */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        // }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            opacity: 0.8,
          }}
        >
          <View style={styles.modal}>
            <View style={styles.modalform}>
              <View style={styles.modalinputview}>
                <Text style={styles.modalinputtext}>Employee Id</Text>
                <TextInput
                  style={styles.modalinput}
                  onChangeText={(text) => setModalEmpId(text)}
                  Value={modalempid}
                />
              </View>
              <View style={styles.modalinputview}>
                <Text style={styles.modalinputtext}>Phone No</Text>
                <TextInput
                  style={styles.modalinput}
                  onChangeText={(text) => setModalPhoneNO(text)}
                  Value={modalphoneno}
                />
              </View>
              <View style={styles.modalinputview}>
                <Text style={styles.modalinputtext}>New Password</Text>
                <TextInput
                  style={styles.modalinput}
                  onChangeText={(text) => setModalNewPassword(text)}
                  Value={modalnewpassword}
                />
              </View>
              <View style={styles.modalinputview}>
                <Text style={styles.modalinputtext}>Confirm Password</Text>
                <TextInput
                  style={styles.modalinput}
                  onChangeText={(text) => setModalConfirmPassword(text)}
                  Value={modalconfirmpassword}
                />
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
                    if (
                      modalempid.length > 0 &&
                      modalphoneno.length > 0 &&
                      modalnewpassword.length > 0 &&
                      modalconfirmpassword.length > 0
                    ) {
                      setChangePassword();
                    } else {
                      alert("All fields must be filled");
                    }
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
          </View>
        </View>
      </Modal>
      {/* Modal Ends */}
      {/* Scroll Starts */}
      <View style={{ marginBottom: ht * 0.1 }}>
        <ScrollView style={{ height: ht * 0.48 }}>
          {/* name starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Name</Text>
            <TextInput style={styles.input} editable={false} value={name} />
          </View>
          {/* name Ends */}
          {/* Emp id starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>EmpID</Text>
            <TextInput style={styles.input} editable={false} value={empId} />
          </View>
          {/* Emp id Ends */}
          {/* designation starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Designation</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={designation}
            />
          </View>
          {/* designation Ends */}
          {/* date of joined starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Date of joined</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={dateofjoin}
            />
          </View>
          {/* date of joined Ends */}
          {/* Company's Email starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Company's Email</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={companyEmail}
            />
          </View>
          {/* Company's Email Ends */}
          {/* Personal Email starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Personal Email</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={personalEmail}
            />
          </View>
          {/* Personla Email Ends */}
          {/* Mobile number starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Mobile Number</Text>
            <TextInput style={styles.input} editable={false} value={mobileno} />
          </View>
          {/* Mobile Number Ends */}
          {/* Date of birth starts */}
          <View style={styles.section}>
            <Text style={styles.inputtitle}>Date of birth</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={dateofbirth}
            />
          </View>
          {/* Date of birth Ends */}
          {/* Change Password Starts */}
          <View style={styles.buttonview}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(true);
              }}
            >
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

export default Profile1;

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
    color: "black",
    fontWeight: "bold",
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
    height: ht * 0.054,
    borderRadius: ht * 0.02,
  },
  buttontext: {
    color: "white",
    textAlign: "center",
    height: ht * 0.054,
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: ht * 0.022,
  },
  modal: {
    position: "absolute",
    top: ht * 0.2,
    left: wd * 0.15,
    backgroundColor: "white",
    elevation: 5,
    height: ht * 0.47,
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
    width: wd * 0.7,
    borderBottomWidth: wd * 0.001,
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
    // backgroundColor: "red",
    paddingLeft: wd * 0.04,
    paddingTop: ht * 0.02,
  },
});
