import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const index = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 NEW: Notification Token State
  const [expoToken, setExpoToken] = useState("");

  const handler = () => setName("Pranav");

  // -------------------------------------------
  //   🔥 ASK PERMISSION + GET TOKEN
  // -------------------------------------------
  const registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Ask permission if not already granted
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("❌ Notification permission denied");
        return;
      }

      // Get actual Expo Push Token
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra?.eas?.projectId,
      });

      const finalToken = token.data;
      console.log("Expo Push Token:", finalToken);

      // Save to state
      setExpoToken(finalToken);

      // 🔥 FUTURE
      // Send to backend
      // await fetch("https://yourbackend.com/save-token", {
      //   method: "POST",
      //   body: JSON.stringify({ token: finalToken }),
      // });
    } catch (error) {
      console.log("Notification Error:", error);
    }
  };

  // -------------------------------------------
  // RUN ON PAGE LOAD
  // -------------------------------------------
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  // -------------------------------------------
  // Fetch Images
  // -------------------------------------------
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => res.json())
      .then((json) => setImages(json));
  }, []);

  const showFreshers = search === "" || search.toLowerCase().includes("fresh");
  const showMancon = search === "" || search.toLowerCase().includes("mancon");

  return (
    <View className="flex-1 bg-slate-950">
      {/* Header */}
      <View className="px-5 pt-12">
        <Text className="text-gray-400 text-sm">Welcome Back 👋</Text>

        <Text
          className="text-white text-3xl font-extrabold mt-1"
          onPress={handler}
        >
          Hey, {name}
        </Text>

        {/* 🔥 TEMP: Show token on screen (remove later) */}
        {expoToken !== "" && (
          <Text className="text-gray-500 text-xs mt-2">
            Token: {expoToken.substring(0, 25)}...
          </Text>
        )}
      </View>

      {/* Search Bar */}
      <View className="px-5 mt-5">
        <View className="relative">
          <TextInput
            className="
              bg-slate-900 
              border border-purple-700 
              rounded-3xl 
              px-5 py-3.5 
              text-white
              pr-20
              shadow-md shadow-black/40
            "
            placeholder="Search Events..."
            placeholderTextColor={"#787878"}
            value={search}
            onChangeText={setSearch}
          />

          <TouchableOpacity
            className="
              absolute right-1 top-1 
              bg-purple-600 
              rounded-3xl 
              w-16 h-11 
              flex items-center justify-center
              shadow-lg shadow-purple-900/50
            "
            onPress={() => console.log("Searching:", search)}
          >
            <Text className="text-white font-semibold">Go</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Events */}
      <View className="mt-6 pb-20">
        {showFreshers && (
          <View className="px-5 mb-6">
            <Text className="text-xl font-semibold text-gray-200 mb-3 tracking-wide">
              🎉 Freshers 2k25
            </Text>

            <FlatList
              horizontal
              data={images}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="mr-4">
                  <Image
                    source={{ uri: item.download_url }}
                    className="w-80 h-56 rounded-2xl bg-slate-800 shadow-lg shadow-black/40"
                    resizeMode="cover"
                  />
                </View>
              )}
            />
          </View>
        )}

        {showMancon && (
          <View className="px-5 mt-4">
            <Text className="text-xl font-semibold text-gray-200 mb-3 tracking-wide">
              🎤 Mancon 2k24
            </Text>

            <FlatList
              horizontal
              data={images}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id + "-2"}
              renderItem={({ item }) => (
                <View className="mr-4">
                  <Image
                    source={{ uri: item.download_url }}
                    className="w-80 h-56 rounded-2xl bg-slate-800 shadow-lg shadow-black/40"
                    resizeMode="cover"
                  />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default index;
