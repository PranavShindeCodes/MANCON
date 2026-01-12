import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.text}>Settings</Text>
                <Text style={styles.subtext}>Configuration options will appear here.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a", // slate-900
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    subtext: {
        color: "#94a3b8",
        marginTop: 10,
    }
});
