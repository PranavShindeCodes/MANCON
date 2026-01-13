import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "@clerk/clerk-expo"; // <-- Clerk import

const index = () => {
  const { user, isLoaded } = useUser(); // logged-in user
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const showFreshers = search === "" || search.toLowerCase().includes("fresh");
  const showMancon = search === "" || search.toLowerCase().includes("mancon");

  // Fetch images
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => res.json())
      .then((json) => setImages(json));
  }, []);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-950">
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-950">
      {/* Header */}
      <View className="px-5 pt-12 flex-row items-center space-x-3">
        {user?.imageUrl && (
          <Image
            source={{ uri: user.imageUrl }}
            className="w-12 h-12 rounded-full border-2 border-purple-600"
          />
        )}
        <View>
          <Text className="text-gray-400 text-sm">Welcome Back 👋</Text>
          <Text className="text-white text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className="text-gray-400 text-sm">
            {user?.emailAddresses[0]?.emailAddress}
          </Text>
        </View>
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
