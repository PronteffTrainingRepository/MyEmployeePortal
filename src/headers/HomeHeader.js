import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function HomeHeader({ Profile, Login1 }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <View style={{ marginLeft: wd * 0.1, flex: 9 }}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: ht * 0.03,
              fontWeight: "700",
            }}
          >
            Home
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { opacity: 1 }]}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Profile");
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: wd * 0.001,
                fontWeight: "700",
                fontSize: ht * 0.03,
              }}
            >
              <Text
                style={{
                  // color: "white",
                  fontWeight: "500",
                  fontSize: ht * 0.03,
                }}
              >
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Login1");
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: ht * 0.03,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                flex: 1,
                backgroundColor: "#3498DB",
                borderBottomLeftRadius: ht * 0.02,
                borderBottomRightRadius: ht * 0.02,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: ht * 0.03,
                }}
              >
                Dismiss
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    width: wd * 1,
    height: ht * 0.07,
    backgroundColor: "#022169",
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wd * 0.02,
    zIndex: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.8,
  },
  modalView: {
    width: wd * 0.5,
    height: ht * 0.25,
    backgroundColor: "white",
    borderRadius: ht * 0.02,
    elevation: 5,
  },
});
