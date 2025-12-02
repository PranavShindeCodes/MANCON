import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../utils/api";
import { ToastNotification } from "../components/CustomAlert";

const Signup = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("error");

    const showToast = (message, type = "error") => {
        setToastMessage(message);
        setToastType(type);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const handleSignup = async () => {
        if (!name || !email || !password) {
            showToast("Please fill in all fields", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address", "error");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters", "warning");
            return;
        }

        setLoading(true);
        try {
            const res = await api.signup({ name, email, password });

            if (res.success) {
                showToast("Account created! Redirecting...", "success");
                setTimeout(() => router.replace("/signin"), 2000);
            } else {
                showToast(res.error || "Signup failed", "error");
            }
        } catch (error) {
            showToast("Connection error. Check your network.", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    className="px-6"
                >
                    <View className="w-full max-w-md mx-auto">
                        {/* Header */}
                        <Animated.View
                            entering={FadeInDown.delay(200).duration(1000).springify()}
                            className="items-center mb-10"
                        >
                            <Text className="text-white text-4xl font-bold tracking-wider text-center">
                                Create Account
                            </Text>
                            <Text className="text-gray-400 mt-2 text-base text-center">
                                Sign up to get started!
                            </Text>
                        </Animated.View>

                        {/* Form */}
                        <Animated.View
                            entering={FadeInUp.delay(400).duration(1000).springify()}
                            className="space-y-6"
                        >
                            <View>
                                <Text className="text-gray-300 mb-2 ml-1 font-medium">Full Name</Text>
                                <TextInput
                                    placeholder="John Doe"
                                    placeholderTextColor="#64748b"
                                    className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 focus:border-purple-600"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            <View>
                                <Text className="text-gray-300 mb-2 ml-1 font-medium">Email</Text>
                                <TextInput
                                    placeholder="hello@example.com"
                                    placeholderTextColor="#64748b"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 focus:border-purple-600"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <View>
                                <Text className="text-gray-300 mb-2 ml-1 font-medium">Password</Text>
                                <TextInput
                                    placeholder="••••••••"
                                    placeholderTextColor="#64748b"
                                    secureTextEntry
                                    className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 focus:border-purple-600"
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handleSignup}
                                activeOpacity={0.8}
                                disabled={loading}
                                className={`bg-purple-600 p-4 rounded-2xl shadow-lg shadow-purple-900/50 mt-4 ${loading ? 'opacity-70' : ''}`}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text className="text-white text-center font-bold text-lg">
                                        Sign Up
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Footer */}
                        <Animated.View
                            entering={FadeInUp.delay(600).duration(1000).springify()}
                            className="flex-row justify-center mt-8"
                        >
                            <Text className="text-gray-400">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push("/signin")}>
                                <Text className="text-purple-500 font-bold">Log In</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <ToastNotification
                visible={toastVisible}
                message={toastMessage}
                type={toastType}
            />
        </SafeAreaView>
    );
};

export default Signup;
