import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function TicketScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleScan = async ({ data, type }) => {
    setScanned(true);
    const scannedCode = data.trim();
    console.log("SCANNED DATA:", scannedCode);

    const API_URL = `https://mancon-backend.onrender.com/api/user/${scannedCode}`;

    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      console.log("FULL API RESPONSE:", json);

      if (json.user?.status === true) {
        Alert.alert(
          "🟢 VERIFIED",
          `User Verified Successfully!\nID: ${scannedCode}`,
          [{ text: "OK", onPress: () => setScanned(false) }]
        );
      } else {
        Alert.alert(
          "🔴 NOT VERIFIED",
          `User Not Verified\nID: ${scannedCode}`,
          [{ text: "OK", onPress: () => setScanned(false) }]
        );
      }
    } catch (error) {
      console.log("Fetch user error:", error);
      Alert.alert("❌ ERROR", "Cannot connect to server", [
        { text: "OK", onPress: () => setScanned(false) },
      ]);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{ barcodeTypes: ["qr", "code128"] }}
      />

      <View style={styles.overlay}>
        <Text style={styles.text}>Scan Ticket QR / Barcode</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
