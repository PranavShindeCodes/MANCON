import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SimpleScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  // 🔹 Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-black p-6">
        <Text className="text-white text-center text-lg mb-4">
          Camera permission needed
        </Text>
        <TouchableOpacity
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 🔹 Handle scan
  const handleScan = async ({ type, data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      // 🔹 Replace localhost with LAN IP if testing on real device
      const res = await fetch(`http://10.136.182.195:1000/api/user/${data}`);
      const json = await res.json();

      if (json.user && json.user.status === true) {
        Alert.alert("✅ Access Granted", `User: ${json.user.name}`);
      } else {
        Alert.alert("❌ Access Denied", `User not approved or not found`);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setScanned(false); // ready for next scan
    }
  };

  const toggleCamera = () => {
    setFacing(
      facing === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={facing}
        onBarCodeScanned={handleScan}
        barCodeScannerSettings={{
          barCodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
          ],
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "lime", fontWeight: "bold", marginBottom: 10 }}>
          Scan QR/Barcode
        </Text>
        <TouchableOpacity
          onPress={toggleCamera}
          style={{
            padding: 10,
            backgroundColor: "#00000080",
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "lime",
          }}
        >
          <Text style={{ color: "lime", fontWeight: "bold" }}>Flip Camera</Text>
        </TouchableOpacity>
        {scanned && (
          <ActivityIndicator color="white" style={{ marginTop: 10 }} />
        )}
      </View>
    </View>
  );
}
