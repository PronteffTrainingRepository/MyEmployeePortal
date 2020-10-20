import React, { useEffect, useState } from "react";
import Main from "./src/Main";
import Home from "./src/Home";
import Sheet from "./src/Sheet";
import Login1 from "./src/Login1";
import WorkTime from "./src/WorkTime";
import Profile from "./src/Profile";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native";
// import { enableScreens } from "react-native-screens";

import { connect } from "react-redux";
import { loginData, logOut } from "./src/redux/Action";
// enableScreens();
const Stack = createStackNavigator();

function Routes(props) {
  const [token, settoken] = useState(null);
  // const [nav, setNav] = useState(false);
  // const [checktoken, setCheckToken] = useState();

  // useEffect(() => {
  //   getData();
  // }, []);
  // var s;
  // const getData = async () => {
  //   const asynctoken = await AsyncStorage.getItem("token")
  //     .then((asynctoken) => {
  //       console.log("asynctoken", asynctoken);
  //       setNav(true);
  //     })
  //     .then((asynctoken) => {
  //       if (asynctoken == null) {
  //         s = false;
  //       } else {
  //         s = true;
  //       }
  //     });
  // };
  alert(props.values.Token);
  console.log("ksajfdpahhsfopiahsgopu", props);
  useEffect(() => {
    const asynctoken = AsyncStorage.getItem("token");
    if (asynctoken) {
      settoken(true);
      props.loginData();
    } else {
      settoken(false);
      props.logOut();
    }
  }, []);

  return (
    <NavigationContainer>
      {token == null ? (
        <Stack.Navigator>
          {props.values.Token ? (
            <>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkTime"
                component={WorkTime}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Sheet"
                component={Sheet}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login1"
              component={Login1}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  values: state.tokens,
});

export default connect(mapStateToProps, { loginData, logOut })(Routes);
