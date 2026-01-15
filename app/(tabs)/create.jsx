import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Create() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loginId, setLoginId] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [items, setItems] = useState([
    { label: "BCA I", value: "BCA I" },
    { label: "BCA II", value: "BCA II" },
    { label: "BCA III", value: "BCA III" },
    { label: "MCA I", value: "MCA I" },
    { label: "MCA II", value: "MCA II" },
    { label: "BBA I", value: "BBA I" },
    { label: "BBA II", value: "BBA II" },
    { label: "BBA III", value: "BBA III" },
    { label: "MBA I", value: "MBA I" },
    { label: "MBA II", value: "MBA II" },
  ]);

  useEffect(() => {
    const loadQR = async () => {
      const data = await AsyncStorage.getItem("scannedCodes");
      if (data) {
        const list = JSON.parse(data);
        if (list.length > 0) {
          setLoginId(list[0].value);
        }
      }
    };
    loadQR();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !selectedClass || !image || !loginId) {
      Alert.alert("Error", "Fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("idCard", loginId);
    formData.append("classYear", selectedClass);
    formData.append("status", false);
    formData.append("image", {
      uri: image,
      name: "student.jpg",
      type: "image/jpeg",
    });

    try {
      // Replace YOUR_PC_IP with your computer's IP if using real device
      const res = await fetch("http://10.136.182.195:1000/api/user/login", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (data.success !== false) {
        Alert.alert("Success", "Registration Done");
        setName("");
        setSelectedClass(null);
        setImage(null);
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Server Error", "Check your backend server");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-900"
    >
      <View className="flex-1 px-5 pt-12">
        <Text className="text-white text-3xl font-extrabold mb-6">
          Book Your Ticket 🎟️
        </Text>

        {/* Name */}
        <Text className="text-gray-300 mb-1 ml-1">Full Name</Text>
        <TextInput
          className="bg-slate-800 border border-purple-700 rounded-2xl px-4 py-3 text-white mb-4"
          placeholder="Enter your full name"
          placeholderTextColor="#787878"
          value={name}
          onChangeText={setName}
        />

        {/* Dropdown */}
        <Text className="text-gray-300 mb-2 ml-1">Class / Batch</Text>
        <DropDownPicker
          open={open}
          value={selectedClass}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedClass}
          setItems={setItems}
          listMode="SCROLLVIEW"
          placeholder="Select your class"
          style={{
            backgroundColor: "#020617",
            borderColor: "#7c3aed",
            borderRadius: 16,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#020617",
            borderColor: "#7c3aed",
          }}
          textStyle={{ color: "white", fontSize: 16 }}
          placeholderStyle={{ color: "#787878" }}
          zIndex={5000}
        />

        {/* Image */}
        <Text className="text-gray-300 mt-5 mb-2 ml-1">Upload Photo</Text>
        <TouchableOpacity
          onPress={pickImage}
          className="bg-slate-800 border border-purple-700 py-4 rounded-2xl mb-4"
        >
          <Text className="text-white text-center text-lg">Choose Image</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image }}
            className="w-full h-56 rounded-2xl mb-4"
          />
        )}

        {/* 🔐 Logged in QR */}
        {loginId && (
          <View className="bg-slate-800 border border-purple-700 p-3 rounded-xl mb-4">
            <Text className="text-purple-400 text-center text-sm">
              Logged in with QR
            </Text>
            <Text className="text-white text-center text-lg font-bold">
              {loginId}
            </Text>
          </View>
        )}

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-purple-700 py-4 rounded-2xl mt-2"
        >
          <Text className="text-center text-white text-xl font-bold">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
