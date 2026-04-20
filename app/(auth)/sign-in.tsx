import { Link, useRouter } from "expo-router"; // <-- Import useRouter
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const router = useRouter(); // <-- Initialize router
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = () => {
    // Navigate to the verify screen!
    router.push("/(auth)/verify");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-8">
      {/* Placeholder for your cross logo */}
      <View className="mb-12">
        <Text className="text-brand-green text-4xl font-bold">╬</Text>
      </View>

      <Text className="text-3xl font-bold text-gray-900 mb-8">Sign In</Text>

      <View className="w-full mb-4">
        <Text className="text-gray-400 mb-2 font-medium">Email</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          onChangeText={setEmailAddress}
          className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800"
          placeholder="patient@self.com"
        />
      </View>

      <View className="w-full mb-2">
        <Text className="text-gray-400 mb-2 font-medium">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800"
          placeholder="Min 8 characters"
        />
      </View>

      <TouchableOpacity className="w-full items-end mb-12">
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
