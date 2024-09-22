import React from "react";
import { PixelRatio, Platform, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./bottom-tab";
import Register from "../screen/Auth/Register";
import Login from "../screen/Auth/Login";
import ForgotPasswordEmail from "../screen/Auth/ForgotPassword/ForgotPasswordEmail";
import ForgotPasswordMethods from "../screen/Auth/ForgotPassword/ForgotPasswordMethods";
import ForgotPasswordPhoneNumber from "../screen/Auth/ForgotPassword/ForgotPasswordPhoneNumber";
import OTPVerification from "../screen/Auth/ForgotPassword/OTPVerification";
import CreateNewPassword from "../screen/Auth/ForgotPassword/CreateNewPassword";
import Onboarding0 from "../screen/onboarding/Onboarding0";
import Onboarding1 from "../screen/onboarding/Onboarding1";
import Onboarding2 from "../screen/onboarding/Onboarding2";
import CourseDetails from "../screen/CourseDetails/CourseDetails/CourseDetails";
import CourseList from "../screen/Home/CourseList";
import VideoScreen from "../screen/CourseDetails/video/VideoScreen";


const { width } = Dimensions.get("window");

const extraHeaderConfig =
  PixelRatio.get() <= 2 && Platform.OS === "ios" ? { minWidth: 800 } : {};

const headerStyle = {
  backgroundColor: "#000",
  borderWidth: 0,
  borderBottomColor: "transparent",
  shadowColor: "transparent",
  elevation: 0,
  shadowRadius: 0,
  shadowOffset: {
    height: 0,
  },
};

const headerTitleStyle = {
  alignSelf: "center",
  width: width * 0.86,
  textAlign: "center",
  fontSize: 19,
  ...extraHeaderConfig,
};

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding0"
      screenOptions={{
        headerTintColor: "#000",
        headerBackTitle: "",

        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding0" component={Onboarding0} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
         <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="loginScreen" component={Login} />
       <Stack.Screen name="registerScreen" component={Register} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} />
                    <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen
        name="ForgotPasswordMethods"
        component={ForgotPasswordMethods}
      />

      <Stack.Screen
        name="ForgotPasswordPhoneNumber"
        component={ForgotPasswordPhoneNumber}
      />
      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmail}
      />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
    </Stack.Navigator>
  );
}
