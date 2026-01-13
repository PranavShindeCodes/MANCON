import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useUser, useClerk } from "@clerk/clerk-expo"; // Clerk imports

const Profile = () => {
  const router = useRouter();
  const { signOut } = useClerk(); // logout function
  const { user, isLoaded } = useUser(); // logged-in user info

  // ---- LOGOUT HANDLER ----
  const logoutHandler = async () => {
    try {
      await signOut(); // Clerk session clear
      router.replace("/signin"); // go to login
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  // ---- WAIT TILL USER LOADED ----
  if (!isLoaded) {
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
          source={{ uri: user?.profileImageUrl }}
          className="w-28 h-28 rounded-full border-4 border-purple-600"
        />
        <Text className="text-white text-xl font-semibold mt-4">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text className="text-gray-400 mt-1 text-sm">
          {user?.emailAddresses[0]?.emailAddress}
        </Text>
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

        {/* LOGOUT BUTTON */}
        <TouchableOpacity className="py-5 px-4" onPress={logoutHandler}>
          <Text className="text-red-400 text-lg">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* VERSION */}
      <Text className="text-gray-500 text-center mt-8 mb-6">Version 1.0.0</Text>
    </ScrollView>
  );
};

export default Profile;
