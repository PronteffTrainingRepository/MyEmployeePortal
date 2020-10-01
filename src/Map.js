import { View, StyleSheet, Dimensions, Text } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
const ht = Dimensions.get("screen").height;
const wd = Dimensions.get("screen").width;

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "AIzaSyAUivRYzXhX9GyBebOqfx66pVZoJiXeSpI";

function Map2() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [dir, setDir] = useState(false);

  const onRegionChange = (region) => {
    setRegion({ region });
  };
  console.log(region);

  return (
    <View style={{ position: "absolute" }}>
      <MapView
        region={region}
        onRegionChange={onRegionChange}
        style={styles.map}
        showsUserLocation={true}
      >
        {/* <Marker draggable coordinate={region} /> */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
      {/* <View style={styles.location}>
        <TouchableOpacity>
          <MaterialIcons name="my-location" size={44} color="orange" />
        </TouchableOpacity>
      </View> */}
      <View style={styles.direction}>
        <TouchableOpacity onPress={() => setDir(tru)}>
          <FontAwesome5 name="directions" size={44} color="orange" />
        </TouchableOpacity>
      </View>
      {dir ? (
        <View style={styles.directionView}>
          <TextInput style={styles.enterDirection} autoFocus={true} />

          <TouchableOpacity onPress={() => setDir(false)}>
            <FontAwesome5 name="search-location" size={30} color="orange" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

export default Map2;

const styles = StyleSheet.create({
  map: {
    width: wd * 1,
    height: ht * 0.95,
  },
  location: {
    position: "absolute",
    bottom: ht * 0.13,
    right: wd * 0.04,
  },
  direction: {
    position: "absolute",
    bottom: ht * 0.06,
    right: wd * 0.04,
  },
  enterDirection: {
    borderWidth: wd * 0.002,
    borderColor: "black",
    width: wd * 0.6,
    height: ht * 0.05,
    borderRadius: wd * 0.01,
    marginRight: wd * 0.05,
    paddingLeft: wd * 0.03,
    color: "black",
  },
  directionView: {
    position: "absolute",
    top: ht * 0.22,
    left: wd * 0.02,
    backgroundColor: "white",
    width: wd * 0.8,
    height: ht * 0.08,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wd * 0.03,
    elevation: 10,
  },
});
