import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function index() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [userQR, setUserQR] = useState("");

  const showFreshers = search === "" || search.toLowerCase().includes("fresh");
  const showMancon = search === "" || search.toLowerCase().includes("mancon");

  // Load images
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => res.json())
      .then((json) => setImages(json));
  }, []);

  // Load QR data from storage
  useEffect(() => {
    const loadQR = async () => {
      try {
        const qr = await AsyncStorage.getItem("user_qr");
        if (qr) {
          setUserQR(qr);
        }
      } catch (err) {
        console.log("Storage error", err);
      }
    };
    loadQR();
  }, []);

  return (
    <View className="flex-1 bg-slate-950">
      {/* Header */}
      <View className="px-5 pt-12 flex-row items-center space-x-3">
        <View>
          <Text className="text-gray-400 text-sm">Welcome Back 👋</Text>
          <Text className="text-white text-2xl font-bold">
            {userQR ? userQR : "Guest"}
          </Text>
        </View>
      </View>

      {/* Search */}
      <View className="px-5 mt-5">
        <View className="relative">
          <TextInput
            className="bg-slate-900 border border-purple-700 rounded-3xl px-5 py-3.5 text-white pr-20"
            placeholder="Search Events..."
            placeholderTextColor="#787878"
            value={search}
            onChangeText={setSearch}
          />

          <TouchableOpacity className="absolute right-1 top-1 bg-purple-600 rounded-3xl w-16 h-11 flex items-center justify-center">
            <Text className="text-white font-semibold">Go</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Events */}
      <View className="mt-6 pb-20">
        {showFreshers && (
          <View className="px-5 mb-6">
            <Text className="text-xl font-semibold text-gray-200 mb-3">
              🎉 Freshers 2k25
            </Text>

            <FlatList
              horizontal
              data={images}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.download_url }}
                  className="w-80 h-56 rounded-2xl mr-4"
                />
              )}
            />
          </View>
        )}

        {showMancon && (
          <View className="px-5">
            <Text className="text-xl font-semibold text-gray-200 mb-3">
              🎤 Mancon 2k24
            </Text>

            <FlatList
              horizontal
              data={images}
              keyExtractor={(item) => item.id + "x"}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.download_url }}
                  className="w-80 h-56 rounded-2xl mr-4"
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
