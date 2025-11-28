import { Text, View } from "react-native";

const about = () => {
  return (
    <View className="flex-1 bg-slate-900 h-full">
      <View className="flex-1 mt-12 ml-4 mr-4 h-full">
        <View className=" h-16 w-full  border-t-2 border-purple-600 ">
          <Text className="text-white pt-4">User Name</Text>
        </View>
        <View className=" h-16   border-t-2 border-purple-600">
          <Text className="text-white  pt-4">About Us</Text>
        </View>
        <View className=" h-16  border-t-2 border-purple-600">
          <Text className="text-white  pt-4">Contact Us</Text>
        </View>
        <View className=" h-16   border-t-2 border-purple-600">
          <Text className="text-white  pt-4">Ticket</Text>
        </View>
        <View className=" h-16   border-t-2 border-purple-600">
          <Text className="text-white  pt-4">Scanner</Text>
        </View>
        <View className=" h-16  border-t-2 border-b-2 border-purple-600">
          <Text className="text-white  pt-4">Logout</Text>
        </View>
      </View>
    </View>
  );
};

export default about;
