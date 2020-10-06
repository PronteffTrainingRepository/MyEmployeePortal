import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function WorkTime() {
  const [submit, setSubmit] = useState(true);
  const [times, getUserTime] = useState(0);

  const getFormattedTime = (time) => {
    getUserTime(time);
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Timer Starts */}
      <View>
        {/* <Timer
          totalDuration={9000}
          msecs
          start={true}
          reset={false}
          //   options={options}
          handleFinish={() => alert("hello")}
          //   getTime={this.getFormattedTime}
        /> */}

        <Stopwatch
          laps
          secs
          start={submit}
          reset={false}
          //   options={options}
          getTime={getFormattedTime}
        />
      </View>
      {/* Timer Ends */}
      {/* Done for the Day Starts */}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSubmit(false)}
        >
          <Text style={styles.buttontext}>Done For the Day</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{times}</Text>
      </View>
      {/* Done for the Day Ends */}
    </View>
  );
}

export default WorkTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: wd * 0.5,
    height: ht * 0.06,
    backgroundColor: "black",
    borderRadius: ht * 0.02,
    marginTop: ht * 0.1,
  },
  buttontext: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    height: ht * 0.06,
    fontWeight: "bold",
    fontSize: ht * 0.04,
  },
});
