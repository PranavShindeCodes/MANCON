import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import "../global.css";

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={{
        getToken: (key) => SecureStore.getItemAsync(key),
        saveToken: (key, value) => SecureStore.setItemAsync(key, value),
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
