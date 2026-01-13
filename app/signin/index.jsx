import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Save user data to AsyncStorage
  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log("✅ User saved to AsyncStorage:", userData);
    } catch (err) {
      console.log("❌ Error saving user data:", err);
    }
  };

  // Watch for logged-in user
  useEffect(() => {
    if (isLoaded && user) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress,
        imageUrl: user.imageUrl,
      };
      console.log("👤 User loaded:", userData); // <-- LOG DATA
      saveUserData(userData);
      router.replace("(tabs)");
    } else if (isLoaded && !user) {
      setLoading(false);
      console.log("User not logged in yet.");
    }
  }, [isLoaded, user]);

  const login = async () => {
    try {
      console.log("🔑 Starting OAuth login...");
      await startOAuthFlow(); // start login
      console.log("OAuth flow finished, waiting for user to load...");

      // Optional: extra interval if user state not ready immediately
      const interval = setInterval(() => {
        if (user) {
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0]?.emailAddress,
            imageUrl: user.imageUrl,
          };
          console.log("👤 User after OAuth:", userData); // <-- LOG DATA
          saveUserData(userData);
          clearInterval(interval);
          router.replace("/(tabs)");
        }
      }, 500);
    } catch (err) {
      console.log("❌ Login failed:", err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-900">
        <ActivityIndicator size="large" color="#8b3eff" />
        <Text className="text-white mt-4 text-base">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-5">
      <Text className="text-3xl font-bold text-white mb-8 text-center">
        Welcome Back!
      </Text>

      {/* GOOGLE LOGIN BUTTON WITH ICON */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-white py-3 px-5 rounded-lg w-full max-w-xs shadow-lg"
        onPress={login}
        activeOpacity={0.8}
      >
        <FontAwesome name="google" size={24} color="#DB4437" className="mr-3" />
        <Text className="text-black font-semibold text-lg">
          Login with Google
        </Text>
      </TouchableOpacity>

      <Text className="text-gray-400 text-center mt-6 text-sm">
        By continuing, you agree to our Terms & Privacy Policy
      </Text>
    </View>
  );
}
