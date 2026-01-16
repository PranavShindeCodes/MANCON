import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("loginQR");
    router.replace("/");
  };

  const ticketHandler = () => {
    router.push("/TicketScanner");
  };

  // 🔥 Fetch user from DB using QR stored ID
  const fetchUserFromDB = async () => {
    try {
      const stored = await AsyncStorage.getItem("loginQR");
      if (!stored) return;

      const parsed = JSON.parse(stored);
      const userId = parsed.value; // eg: BCA0324

      const res = await fetch(`http://localhost:1000/api/user/${userId}`);
      const data = await res.json();

      if (data?.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.log("Fetch user error:", err);
    }
  };

  useEffect(() => {
    fetchUserFromDB();
  }, []);

  return (
    <ScrollView className="flex-1 bg-slate-900 pt-12">
      {/* Profile Header */}
      <View className="items-center mb-8 px-5">
        <Image
          source={{
            uri: user?.image || "https://i.pravatar.cc/00",
          }}
          className="w-28 h-28 rounded-full border-4 border-purple-600"
        />

        <Text className="text-white text-xl font-semibold mt-4">
          {user?.name || "Guest User"}
        </Text>

        <Text className="text-gray-400 mt-1 text-sm">
          {user?.idCard || "Not Logged In"}
        </Text>

        {user?.status === false && (
          <Text className="mt-2 text-yellow-400 text-sm">
            ⏳ Waiting for Admin Approval
          </Text>
        )}

        {user?.status === true && (
          <Text className="mt-2 text-green-400 text-sm">✅ Approved</Text>
        )}
      </View>

      {/* Menu */}
      <View className="mx-5 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <TouchableOpacity className="py-5 px-4 border-b border-white/10">
          <Text className="text-white text-lg">About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-5 px-4 border-b border-white/10">
          <Text className="text-white text-lg">Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-5 px-4 border-b border-white/10"
          onPress={ticketHandler}
        >
          <Text className="text-white text-lg">Your Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-5 px-4 border-b border-white/10">
          <Text className="text-white text-lg">QR Scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-5 px-4" onPress={logoutHandler}>
          <Text className="text-red-400 text-lg">Logout</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-500 text-center mt-8 mb-6">Version 1.0.0</Text>
    </ScrollView>
  );
};

export default Profile;
