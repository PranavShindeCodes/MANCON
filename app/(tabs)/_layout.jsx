import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#aaa",

        // Only place where inline style is required
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,

          backgroundColor: "rgba(30,30,30,0.45)", // transparent glass
          borderRadius: 20,
          height: 65,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 8,
        },
      }}
    >
      {/* HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      {/* FLOATING CREATE BUTTON */}
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: () => (
            <View
              className="w-16 h-16 bg-purple-600 rounded-full mb-10 
                         justify-center items-center shadow-lg"
              style={{
                shadowColor: "#8b3eff",
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 12,
              }}
            >
              <FontAwesome name="plus" size={30} color="white" />
            </View>
          ),
        }}
      />

      {/* PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
