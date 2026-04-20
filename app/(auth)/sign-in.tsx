import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // 1. Add state to hold our validation errors
  const [errors, setErrors] = useState({ email: "", password: "" });

  // 2. Create the validation logic
  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    // Email validation: Required and standard format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAddress) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(emailAddress)) {
      newErrors.email = "Please enter a valid email format.";
      isValid = false;
    }

    // Password validation: Required and min length
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSignInPress = () => {
    // 3. Only navigate if the form passes validation
    if (validateForm()) {
      router.push("/(auth)/verify");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-8">
      {/* Placeholder for your cross logo */}
      <View className="mb-12">
        <Text className="text-brand-green text-4xl font-bold">╬</Text>
      </View>

      <Text className="text-3xl font-bold text-gray-900 mb-8">Sign In</Text>

      {/* Email Input Group */}
      <View className="w-full mb-4">
        <Text className="text-gray-400 mb-2 font-medium">Email</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          onChangeText={(text) => {
            setEmailAddress(text);
            // Clear error when user starts typing again
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          className={`w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800 ${
            errors.email ? "border border-red-500 bg-red-50" : ""
          }`}
          placeholder="patient@self.com"
          keyboardType="email-address"
        />
        {/* Display Email Error */}
        {errors.email ? (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>
        ) : null}
      </View>

      {/* Password Input Group */}
      <View className="w-full mb-2">
        <Text className="text-gray-400 mb-2 font-medium">Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            // Clear error when user starts typing again
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          secureTextEntry={true}
          className={`w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800 ${
            errors.password ? "border border-red-500 bg-red-50" : ""
          }`}
          placeholder="Min 8 characters"
        />
        {/* Display Password Error */}
        {errors.password ? (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.password}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity className="w-full items-end mb-12 mt-2">
        <Text className="text-brand-green font-medium">
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSignInPress}
        className="w-full bg-brand-green py-4 rounded-full items-center mb-6 shadow-sm shadow-brand-green/30"
      >
        <Text className="text-white font-bold text-lg">Sign In</Text>
      </TouchableOpacity>

      <View className="flex-row">
        <Text className="text-gray-400">Don't have an account? </Text>
        <Link href="/(auth)/sign-up" asChild>
          <TouchableOpacity>
            <Text className="text-brand-green font-medium underline">
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
