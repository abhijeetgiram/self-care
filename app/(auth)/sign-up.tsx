import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  // 1. Add state to hold our validation errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    agreed: "",
  });

  // 2. Create the validation logic
  const validateForm = () => {
    let isValid = true;
    let newErrors = { fullName: "", email: "", password: "", agreed: "" };

    // Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAddress) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(emailAddress)) {
      newErrors.email = "Please enter a valid email format.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    // Terms validation
    if (!agreed) {
      newErrors.agreed = "You must agree to the Terms and Privacy Policy.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSignUpPress = () => {
    // 3. Only navigate if the form passes validation
    if (validateForm()) {
      router.push("/(auth)/verify");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-8 pt-12">
      {/* Logo */}
      <View className="items-center mb-10 mt-10">
        <View className="flex-row">
          <Text className="text-brand-green text-3xl font-bold">+</Text>
          <Text className="text-brand-purple text-3xl font-bold">+</Text>
        </View>
      </View>

      <Text className="text-3xl font-bold text-center text-gray-900 mb-10">
        Sign Up
      </Text>

      {/* Full Name Input Group */}
      <View className="w-full mb-4">
        <Text className="text-gray-400 mb-2 font-medium">Full Name</Text>
        <TextInput
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) setErrors({ ...errors, fullName: "" });
          }}
          className={`w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800 ${
            errors.fullName ? "border border-red-500 bg-red-50" : ""
          }`}
          placeholder="Abhijeet Giram"
        />
        {errors.fullName ? (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.fullName}
          </Text>
        ) : null}
      </View>

      {/* Email Input Group */}
      <View className="w-full mb-4">
        <Text className="text-gray-400 mb-2 font-medium">Email</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          onChangeText={(text) => {
            setEmailAddress(text);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          className={`w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800 ${
            errors.email ? "border border-red-500 bg-red-50" : ""
          }`}
          placeholder="abhijeet@example.com" // Localized placeholder
          keyboardType="email-address"
        />
        {errors.email ? (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>
        ) : null}
      </View>

      {/* Password Input Group */}
      <View className="w-full mb-6">
        <Text className="text-gray-400 mb-2 font-medium">Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          secureTextEntry={true}
          className={`w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800 ${
            errors.password ? "border border-red-500 bg-red-50" : ""
          }`}
          placeholder="Min 8 characters"
        />
        {errors.password ? (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.password}
          </Text>
        ) : null}
      </View>

      {/* Checkbox row */}
      <View className="mb-8">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              setAgreed(!agreed);
              if (errors.agreed && !agreed === true) {
                setErrors({ ...errors, agreed: "" });
              }
            }}
            className={`w-6 h-6 rounded border items-center justify-center mr-3 ${
              agreed
                ? "bg-brand-green border-brand-green"
                : errors.agreed
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
            }`}
          >
            {agreed && <Text className="text-white text-xs font-bold">✓</Text>}
          </TouchableOpacity>
          <Text className="text-gray-400">
            I agree with Terms and{" "}
            <Text className="text-brand-green underline">Privacy Policy</Text>
          </Text>
        </View>
        {errors.agreed ? (
          <Text className="text-red-500 text-xs mt-2 ml-1">
            {errors.agreed}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={onSignUpPress}
        className="w-full bg-brand-green py-4 rounded-full items-center mb-6 shadow-sm shadow-brand-green/30"
      >
        <Text className="text-white font-bold text-lg">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-auto mb-10">
        <Text className="text-gray-400">Already have an account? </Text>
        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity>
            <Text className="text-brand-green font-medium underline">
              Sign In
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
