import React, { useState } from "react";
import { View, Dimensions, StyleSheet, StatusBar, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
const ht = Dimensions.get("window").width;
const wd = Dimensions.get("window").height;

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "AIzaSyAUivRYzXhX9GyBebOqfx66pVZoJiXeSpI";

function Home({ route, navigation }) {
  const { user } = route.params;
  const [attendence, setAttendence] = useState("");
  const data = {
    // labels: ["Swim", "Bike", "Run"], // optional
    data: [2],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "black",
    backgroundGradientTo: "black",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // barPercentage:100,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
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
    <View>
      <StatusBar />
      {/* header bar starts */}
      <View style={styles.header}>
        <View>
          <AntDesign name="caretright" size={24} color="black" />
        </View>
        <View style={{ marginLeft: wd * 0.14 }}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: ht * 0.07,
            }}
          >
            Home
          </Text>
        </View>
      </View>

      {/* header bar ends */}
      {/* Attendence Starts */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            width: wd * 0.5,
            height: ht * 0.55,
            marginTop: 2,
            borderRadius: ht * 0.03,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>Attendence</Text>
            <Text>Hi {user}, Your Attenece till Now is..</Text>
          </View>
          <View style={{ alignItems: "flex-end", borderRadius: ht * 0.2 }}>
            <ProgressChart
              data={data}
              width={wd * 0.12}
              height={ht * 0.24}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
              style={{ borderRadius: ht * 0.2 }}
            />
          </View>
        </View>
      </View>
      {/* Attendence Ends */}
      {/* Map starts */}
      <View>
        <MapView
          region={region}
          onRegionChange={onRegionChange}
          style={styles.map}
          showsUserLocation={true}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        </MapView>
      </View>
      {/* Map Ends */}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    width: wd * 0.7,
    height: ht * 0.14,
    backgroundColor: "red",
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wd * 0.02,
  },
  map: {
    width: wd * 0.52,
    height: ht * 1.22,
  },
});
