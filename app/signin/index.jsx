import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const index = () => {
  const route = useRouter();
  const handler = () => {
    route.navigate("/forget");
  };
  return (
    <View className="bg-slate-800 flex-1 ">
      <View className="w-full  h-1/2 items-center content-center pt-40">
        {/* <Image
          source={require("../assets/images/man.gif")}
          className=" w-1/2 h-1/2 "
        /> */}
      </View>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        className="text-white mt-10 border-b-2 border-purple-600 ml-5 mr-5"
      ></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        className="text-white mt-10 border-b-2 border-purple-600 ml-5 mr-5"
      ></TextInput>
      <TouchableOpacity
        title="Click"
        onPress={handler}
        activeOpacity={0.6}
        className="bg-purple-600   h-13 ml-5 mr-5 mt-10 border rounded-2xl"
      >
        <Text className="text-white text-center p-3 text-xl font-bold ">
          SignIn
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
