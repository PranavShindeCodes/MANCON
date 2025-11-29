import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const Profile = () => {
  // ---- STATES TO STORE API DATA ----
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const handler = () => {
    route.navigate("/signin");
  };

  // ---- API CALL STRUCTURE ----
  const fetchUser = async () => {
    try {
      // FUTURE: Replace this URL with your real API
      // Example: const res = await fetch("https://yourapi.com/user/profile");

      const res = await fetch("https://dummyjson.com/users/1"); // dummy api
      const data = await res.json();

      setUser({
        name: data.firstName + " " + data.lastName,
        email: data.email,
        avatar: data.image,
      });

      setLoading(false);
    } catch (err) {
      console.log("Error Loading Profile:", err);
      setLoading(false);
    }
  };

  // ---- RUN API ON SCREEN LOAD ----
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-900 pt-12">
      {/* USER HEADER */}
      <View className="items-center mb-8 px-5">
        <Image
          source={{ uri: user?.avatar }}
          className="w-28 h-28 rounded-full border-4 border-purple-600"
        />
        <Text className="text-white text-xl font-semibold mt-4">
          {user?.name}
        </Text>
        <Text className="text-gray-400 mt-1 text-sm">{user?.email}</Text>
      </View>

      {/* SETTINGS BOX MODERN LOOK */}
      <View className="mx-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        <TouchableOpacity className="py-5 px-4 border-b border-white/10">
          <Text className="text-white text-lg">About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-5 px-4 border-b border-white/10">
          <Text className="text-white text-lg">Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-5 px-4 border-b border-white/10">
          <Text className="text-white text-lg">Your Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-5 px-4 border-b border-white/10">
          <Text className="text-white text-lg">QR Scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-5 px-4" onPress={handler}>
          <Text className="text-red-400 text-lg">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* VERSION */}
      <Text className="text-gray-500 text-center mt-8 mb-6">Version 1.0.0</Text>
    </ScrollView>
  );
};

export default Profile;
