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

  const onSignUpPress = async () => {
    // We will add the Clerk logic here next!
    // For now, just route to verify screen manually to test the UI flow
    router.push("/(auth)/verify");
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

      <View className="w-full mb-4">
        <Text className="text-gray-400 mb-2 font-medium">Full Name</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800"
          placeholder="Jan Kowalski"
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-gray-400 mb-2 font-medium">Email</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          onChangeText={setEmailAddress}
          className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800"
          placeholder="patient@self.com"
          keyboardType="email-address"
        />
      </View>

      <View className="w-full mb-6">
        <Text className="text-gray-400 mb-2 font-medium">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800"
          placeholder="Min 8 characters"
        />
      </View>

      {/* Checkbox row */}
      <View className="flex-row items-center mb-10">
        <TouchableOpacity
          onPress={() => setAgreed(!agreed)}
          className={`w-6 h-6 rounded border items-center justify-center mr-3 ${
            agreed
              ? "bg-brand-green border-brand-green"
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
