import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QRScanner() {
  const router = useRouter();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  // 🔥 Auto login if already scanned
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("loginQR");
      if (token) {
        router.replace("(tabs)");
      } else {
        setCheckingLogin(false);
      }
    };
    checkLogin();
  }, []);

  if (checkingLogin) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-lg mb-4">
          We need your permission to access the camera
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          className="bg-emerald-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 🔥 Handle QR Scan
  const handleScan = async ({ data, type }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const loginData = {
        value: data,
        type,
        time: new Date().toLocaleString(),
      };

      await AsyncStorage.setItem("loginQR", JSON.stringify(loginData));

      Alert.alert("Login Successful", data, [
        {
          text: "OK",
          onPress: () => router.replace("(tabs)"),
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to login");
      setScanned(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        className="flex-1"
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
          ],
        }}
        onBarcodeScanned={handleScan}
      >
        {/* Overlay */}
        <View className="flex-1 items-center justify-center bg-black/40">
          {/* Scan box */}
          <View className="w-64 h-64 border-2 border-emerald-400 rounded-2xl bg-white/5" />

          {/* Text */}
          {!scanned && (
            <View className="absolute top-16 items-center">
              <Text className="text-white text-lg font-semibold">
                Scan your QR to Login
              </Text>
              <ActivityIndicator className="mt-3" color="white" />
            </View>
          )}
        </View>

        {/* Bottom Button */}
        <View className="absolute bottom-10 w-full items-center">
          <TouchableOpacity
            onPress={toggleCameraFacing}
            className="px-8 py-3 rounded-full border border-emerald-400 bg-black/70"
          >
            <Text className="text-emerald-400 text-base font-semibold">
              Flip Camera
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
