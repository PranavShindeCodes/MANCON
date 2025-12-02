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

const ForgotPassword = () => {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [loading, setLoading] = useState(false);

    // STEP 1: Send OTP
    const handleSendOtp = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email");
            return;
        }
        setLoading(true);
        try {
            const res = await api.sendOtp({ email });
            if (res.success) {
                Alert.alert("Success", "OTP sent to your email!");
                setStep(2);
            } else {
                Alert.alert("Error", res.error || "Failed to send OTP");
            }
        } catch (error) {
            Alert.alert("Error", "Network error");
        } finally {
            setLoading(false);
        }
    };

    // STEP 2: Verify OTP
    const handleVerifyOtp = async () => {
        if (!otp) {
            Alert.alert("Error", "Please enter the OTP");
            return;
        }
        setLoading(true);
        try {
            const res = await api.verifyOtp({ email, otp });
            if (res.success) {
                setResetToken(res.resetToken);
                setStep(3);
            } else {
                Alert.alert("Error", res.error || "Invalid OTP");
            }
        } catch (error) {
            Alert.alert("Error", "Network error");
        } finally {
            setLoading(false);
        }
    };

    // STEP 3: Reset Password
    const handleResetPassword = async () => {
        if (!newPassword) {
            Alert.alert("Error", "Please enter a new password");
            return;
        }
        setLoading(true);
        try {
            const res = await api.resetPassword({ resetToken, newPassword });
            if (res.success) {
                Alert.alert("Success", "Password reset successful! Please login.");
                router.replace("/signin");
            } else {
                Alert.alert("Error", res.error || "Failed to reset password");
            }
        } catch (error) {
            Alert.alert("Error", "Network error");
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
                            <Text className="text-white text-3xl font-bold tracking-wider text-center">
                                {step === 1 ? "Reset Password" : step === 2 ? "Verify OTP" : "New Password"}
                            </Text>
                            <Text className="text-gray-400 mt-2 text-base text-center max-w-xs">
                                {step === 1
                                    ? "Enter your email to receive a reset code."
                                    : step === 2
                                        ? "Enter the 6-digit code sent to your email."
                                        : "Create a strong new password."}
                            </Text>
                        </Animated.View>

                        {/* Form */}
                        <Animated.View
                            entering={FadeInUp.delay(400).duration(1000).springify()}
                            className="space-y-6"
                        >
                            {step === 1 && (
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
                                    <TouchableOpacity
                                        onPress={handleSendOtp}
                                        activeOpacity={0.8}
                                        disabled={loading}
                                        className={`bg-purple-600 p-4 rounded-2xl shadow-lg shadow-purple-900/50 mt-6 ${loading ? 'opacity-70' : ''}`}
                                    >
                                        {loading ? <ActivityIndicator color="white" /> : (
                                            <Text className="text-white text-center font-bold text-lg">Send OTP</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}

                            {step === 2 && (
                                <View>
                                    <Text className="text-gray-300 mb-2 ml-1 font-medium">OTP Code</Text>
                                    <TextInput
                                        placeholder="123456"
                                        placeholderTextColor="#64748b"
                                        keyboardType="number-pad"
                                        className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 focus:border-purple-600 text-center text-2xl tracking-widest"
                                        value={otp}
                                        onChangeText={setOtp}
                                        maxLength={6}
                                    />
                                    <TouchableOpacity
                                        onPress={handleVerifyOtp}
                                        activeOpacity={0.8}
                                        disabled={loading}
                                        className={`bg-purple-600 p-4 rounded-2xl shadow-lg shadow-purple-900/50 mt-6 ${loading ? 'opacity-70' : ''}`}
                                    >
                                        {loading ? <ActivityIndicator color="white" /> : (
                                            <Text className="text-white text-center font-bold text-lg">Verify Code</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}

                            {step === 3 && (
                                <View>
                                    <Text className="text-gray-300 mb-2 ml-1 font-medium">New Password</Text>
                                    <TextInput
                                        placeholder="••••••••"
                                        placeholderTextColor="#64748b"
                                        secureTextEntry
                                        className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 focus:border-purple-600"
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={handleResetPassword}
                                        activeOpacity={0.8}
                                        disabled={loading}
                                        className={`bg-purple-600 p-4 rounded-2xl shadow-lg shadow-purple-900/50 mt-6 ${loading ? 'opacity-70' : ''}`}
                                    >
                                        {loading ? <ActivityIndicator color="white" /> : (
                                            <Text className="text-white text-center font-bold text-lg">Reset Password</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Animated.View>

                        {/* Footer */}
                        <Animated.View
                            entering={FadeInUp.delay(600).duration(1000).springify()}
                            className="flex-row justify-center mt-8"
                        >
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text className="text-gray-400 font-medium">Back to Login</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ForgotPassword;
