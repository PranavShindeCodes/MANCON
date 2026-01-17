import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* First screen: index.jsx */}
      <Stack.Screen name="index" />
      <Stack.Screen name="TicketScanner" />

      {/* Tabs layout: just reference the layout folder */}
      <Stack.Screen name="(tabs)/index" />
    </Stack>
  );
}
