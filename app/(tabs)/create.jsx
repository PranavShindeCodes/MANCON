import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [photo, setPhoto] = useState(null);

  const classOptions = [
    { label: "BBA I → MBA II", value: "BBA I → MBA II" },
    { label: "BCA I → MCA", value: "BCA I → MCA" },
  ];

  // Pick image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return alert("Permission denied!");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) setPhoto(result.assets[0]);
  };

  // Submit to backend
  const handleSubmit = async () => {
    if (!name || !selectedClass || !photo) return alert("Fill all fields!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("class", selectedClass);

    formData.append("photo", {
      uri: photo.uri,
      type: "image/jpeg",
      name: "userphoto.jpg",
    });

    try {
      const res = await fetch("http://YOUR_SERVER_IP:5000/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      console.log(data);
      Alert.alert("Success", "Data uploaded successfully!");
      setName("");
      setSelectedClass("");
      setPhoto(null);
    } catch (err) {
      console.log("Upload error:", err);
      Alert.alert("Error", "Upload failed!");
    }
  };

  return (
    <ScrollView className="bg-slate-900 flex-1 px-5 pt-12">
      <Text className="text-white text-3xl font-extrabold mb-6">
        Book Your Ticket 🎟️
      </Text>

      <Text className="text-gray-300 mb-1 ml-1">Full Name</Text>
      <TextInput
        className="bg-slate-800 border border-purple-700 rounded-2xl px-4 py-3 text-white mb-4"
        placeholder="Enter your full name"
        placeholderTextColor="#787878"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-gray-300 mb-1 ml-1">Class / Batch</Text>
      <View className="bg-slate-800 border border-purple-700 rounded-2xl mb-4">
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          dropdownIconColor="#fff"
          style={{ color: "white" }}
        >
          <Picker.Item label="Select Class" value="" />
          {classOptions.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      <Text className="text-gray-300 mb-1 ml-1">Upload Photo</Text>
      <TouchableOpacity
        className="bg-purple-700 py-3 rounded-2xl mb-4 items-center justify-center"
        onPress={pickImage}
      >
        <Text className="text-white font-semibold text-lg">Choose Photo</Text>
      </TouchableOpacity>
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          className="w-32 h-32 rounded-2xl mb-4 self-center"
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        className="bg-purple-700 py-4 rounded-2xl shadow-lg shadow-purple-900/50 mb-20"
        onPress={handleSubmit}
      >
        <Text className="text-center text-white text-xl font-bold">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Create;
