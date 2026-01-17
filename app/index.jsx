import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
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

  // Auto login if already scanned
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
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        { text: "OK", onPress: () => router.replace("(tabs)") },
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
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
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
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Scan box */}
        <View style={styles.scanBox} />

        {/* Top text + loader */}
        {!scanned && (
          <View style={styles.topTextContainer}>
            <Text style={styles.topText}>Scan your QR to Login</Text>
            <ActivityIndicator color="white" style={{ marginTop: 10 }} />
          </View>
        )}

        {/* Bottom flip button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.flipButtonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  permissionText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  permissionButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  permissionButtonText: { color: "white", fontWeight: "600" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#10B981",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  topTextContainer: { position: "absolute", top: 50, alignItems: "center" },
  topText: { color: "white", fontSize: 18, fontWeight: "600" },
  bottomButtonContainer: { position: "absolute", bottom: 50 },
  flipButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  flipButtonText: { color: "#10B981", fontSize: 16, fontWeight: "600" },
});
