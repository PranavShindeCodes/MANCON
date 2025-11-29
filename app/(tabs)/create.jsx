import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const Create = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [className, setClassName] = useState("");
  const [batch, setBatch] = useState("");

  const handlePayment = () => {
    console.log("Proceed to Razorpay");
    router.push("/success"); // simple redirect
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

      <Text className="text-gray-300 mb-1 ml-1">Phone Number</Text>
      <TextInput
        className="bg-slate-800 border border-purple-700 rounded-2xl px-4 py-3 text-white mb-4"
        placeholder="Enter phone number"
        keyboardType="numeric"
        placeholderTextColor="#787878"
        value={phone}
        onChangeText={setPhone}
      />

      <Text className="text-gray-300 mb-1 ml-1">Class</Text>
      <TextInput
        className="bg-slate-800 border border-purple-700 rounded-2xl px-4 py-3 text-white mb-4"
        placeholder="E.g. BCA I"
        placeholderTextColor="#787878"
        value={className}
        onChangeText={setClassName}
      />

      <Text className="text-gray-300 mb-1 ml-1">Batch</Text>
      <TextInput
        className="bg-slate-800 border border-purple-700 rounded-2xl px-4 py-3 text-white mb-4"
        placeholder="E.g. A / B"
        placeholderTextColor="#787878"
        value={batch}
        onChangeText={setBatch}
      />

      {/* Ticket Price */}
      <View className="bg-slate-800 border border-purple-700 rounded-2xl px-5 py-4 mb-8">
        <Text className="text-gray-300 text-lg">Ticket Price</Text>
        <Text className="text-white text-3xl font-extrabold mt-1">₹ 199</Text>
      </View>

      {/* PAY NOW */}
      <TouchableOpacity
        className="bg-purple-700 py-4 rounded-2xl shadow-lg shadow-purple-900/50 mb-20"
        onPress={handlePayment}
      >
        <Text className="text-center text-white text-xl font-bold">
          Pay Now
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Create;
