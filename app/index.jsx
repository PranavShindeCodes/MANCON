import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
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

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to access the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 🔥 Scan & Save to Local Storage
  const handleScan = async ({ data, type }) => {
    if (scanned) return;

    setScanned(true);

    const scannedItem = {
      id: Date.now().toString(),
      value: data,
      type,
      time: new Date().toLocaleString(),
    };

    try {
      const existing = await AsyncStorage.getItem("scannedCodes");
      const list = existing ? JSON.parse(existing) : [];

      list.unshift(scannedItem); // newest on top

      await AsyncStorage.setItem("scannedCodes", JSON.stringify(list));

      Alert.alert("Scan Successful", data, [
        {
          text: "OK",
          onPress: () => router.replace("(tabs)"),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save scan");
    }
  };

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
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
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          {!scanned && (
            <View style={styles.textContainer}>
              <Text style={styles.scanText}>Scan a QR or Barcode</Text>
              <ActivityIndicator color="#fff" style={{ marginTop: 10 }} />
            </View>
          )}
        </View>

        {/* Flip Camera */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { textAlign: "center", marginTop: 20, fontSize: 16 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  textContainer: { position: "absolute", top: 50, alignItems: "center" },
  scanText: { color: "#fff", fontSize: 18 },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  flipButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontSize: 16 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
});
