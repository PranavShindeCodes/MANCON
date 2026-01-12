import { useOAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

// Warm up the browser to improve UX
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { width } = useWindowDimensions();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive?.({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <LinearGradient
            colors={["#4c1d95", "#0f172a", "#000000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Animated.View
                        entering={FadeInUp.delay(200).duration(1000).springify()}
                        style={styles.headerContainer}
                    >
                        <Image
                            source={require("../assets/images/man.gif")}
                            style={[styles.logo, { maxWidth: Math.min(width * 0.5, 300) }]}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>ManCon '26</Text>
                        <Text style={styles.subtitle}>Elevating Minds, Connecting Leaders</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>OFFICIAL EVENT APP</Text>
                        </View>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={styles.buttonWrapper}
                    >
                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={onPress}
                            activeOpacity={0.8}
                        >
                            <AntDesign
                                name="google"
                                size={24}
                                color="#4c1d95"
                                style={styles.icon}
                            />
                            <Text style={styles.buttonText}>Sign in with Google</Text>
                        </TouchableOpacity>

                        <Text style={styles.footerText}>
                            By signing in, you agree to our Terms & Privacy Policy.
                        </Text>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 60,
        width: "100%",
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
        shadowColor: "#a78bfa",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20, // Glow effect? (Works on iOS)
    },
    title: {
        fontSize: 48,
        fontWeight: "900",
        color: "#fff",
        marginBottom: 10,
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    subtitle: {
        fontSize: 18,
        color: "#e2e8f0",
        textAlign: "center",
        fontWeight: "500",
        letterSpacing: 1.2,
        marginBottom: 20,
    },
    badge: {
        backgroundColor: "rgba(167, 139, 250, 0.2)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(167, 139, 250, 0.5)",
    },
    badgeText: {
        color: "#a78bfa",
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    buttonWrapper: {
        width: "100%",
        alignItems: "center",
        maxWidth: 400,
    },
    googleButton: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        marginBottom: 20,
    },
    icon: {
        marginRight: 12,
    },
    buttonText: {
        color: "#4c1d95", // Deep purple text for contrast
        fontSize: 18,
        fontWeight: "bold",
    },
    footerText: {
        color: "#64748b",
        fontSize: 12,
        textAlign: "center",
        marginTop: 20,
    }
});
