import React from "react";
import { View, Button } from "react-native";

function Buttons({ navigation }) {
  return (
    <View>
      <Button title="open" onPress={() => navigation.openDrawer()} />
    </View>
  );
}

export default Buttons;
