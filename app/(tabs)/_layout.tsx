import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#9333ea", // purple-600
                tabBarStyle: {
                    backgroundColor: "#1e293b", // slate-800
                    borderTopColor: "#334155", // slate-700
                },
                headerStyle: {
                    backgroundColor: "#1e293b",
                },
                headerTintColor: "#fff",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
