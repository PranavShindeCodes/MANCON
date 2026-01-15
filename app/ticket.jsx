import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Ticket() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Text className="text-white text-2xl mb-4">Your Ticket</Text>

      <Pressable onPress={() => router.back()}>
        <Text className="text-blue-400">Go Back</Text>
      </Pressable>
    </View>
  );
}
