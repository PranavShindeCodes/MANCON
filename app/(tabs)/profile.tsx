import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const { signOut } = useAuth();
    const { user } = useUser();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                {user?.imageUrl && (
                    <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
                )}
                <Text style={styles.text}>Hello, {user?.fullName || "User"}</Text>
                <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signOut()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#9333ea",
    },
    text: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    email: {
        color: "#94a3b8",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#ef4444", // red-500
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
