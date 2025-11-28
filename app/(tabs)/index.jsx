import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const index = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const handler = () => setName("Pranav");

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => res.json())
      .then((json) => setImages(json));
  }, []);

  const showFreshers = search === "" || search.toLowerCase().includes("fresh");
  const showMancon = search === "" || search.toLowerCase().includes("mancon");

  return (
    <View className="flex-1 bg-slate-900">
      <View>
        <Text
          className="text-white mt-11 ml-5 text-2xl font-extrabold"
          onPress={handler}
        >
          Hey, {name}
        </Text>
      </View>

      {/* Search Box */}
      <View className="px-5 mt-4">
        <View className="relative">
          <TextInput
            className="
              bg-slate-800 
              border border-purple-700 
              rounded-2xl 
              px-4 py-3 
              text-white
              pr-14
            "
            placeholder="Search Events..."
            placeholderTextColor={"#999"}
            value={search}
            onChangeText={setSearch}
          />

          {/* Search Button */}
          <TouchableOpacity
            className="absolute -right-2 -top-2 bg-purple-600 rounded-2xl  m-2 w-12 h-full text-center"
            onPress={() => console.log("Searching:", search)}
          >
            <Text className="text-white text-base text-center p-3">Go</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sections */}
      <View className="h-screen mt-3">
        {showFreshers && (
          <View className="w-screen h-1/3 p-4">
            <Text className="text-2xl font-semibold text-gray-300 mb-2">
              Freshers 2k25
            </Text>

            <FlatList
              horizontal
              data={images}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.download_url }}
                  className="w-80 h-56 rounded-2xl mr-3 bg-slate-700"
                  resizeMode="cover"
                />
              )}
            />
          </View>
        )}

        {showMancon && (
          <View className="w-screen h-1/3 p-4">
            <Text className="text-2xl font-semibold text-gray-300 mb-2">
              Mancon 2k24
            </Text>

            <FlatList
              horizontal
              data={images}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id + "-2"}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.download_url }}
                  className="w-80 h-56 rounded-2xl mr-3 bg-slate-700"
                  resizeMode="cover"
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default index;
