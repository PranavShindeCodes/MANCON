import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter();

  const logoutHandler = () => {
    router.replace("/");
  };

  return (
    <ScrollView className="flex-1 bg-slate-900 pt-12">
      <View className="items-center mb-8 px-5">
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          className="w-28 h-28 rounded-full border-4 border-purple-600"
        />
        <Text className="text-white text-xl font-semibold mt-4">
          Guest User
        </Text>
        <Text className="text-gray-400 mt-1 text-sm">guest@email.com</Text>
      </View>

      <View className="mx-5 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
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

        <TouchableOpacity className="py-5 px-4" onPress={logoutHandler}>
          <Text className="text-red-400 text-lg">Logout</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-500 text-center mt-8 mb-6">Version 1.0.0</Text>
    </ScrollView>
  );
};

export default Profile;
