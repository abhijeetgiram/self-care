import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function Verify() {
  const router = useRouter();
  const { signIn } = useAuth(); // We will call this when verification is successful
  const [code, setCode] = useState<string>("");

  // Numpad logic
  const handleNumberPress = (num: string) => {
    if (code.length < 4) setCode(code + num);
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  const onVerifyPress = () => {
    if (code.length === 4) {
      // Trigger the mock login to redirect to the Home tab!
      signIn();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-12 items-center">
      {/* Logo */}
      <View className="items-center mb-10 mt-10">
        <View className="flex-row">
          <Text className="text-brand-green text-3xl font-bold">+</Text>
          <Text className="text-brand-purple text-3xl font-bold">+</Text>
        </View>
      </View>

      <Text className="text-3xl font-bold text-gray-900 mb-2">Your Code</Text>
      <Text className="text-gray-400 mb-10">Code sent to your Email</Text>

      {/* 4-Digit Code Display */}
      <View className="flex-row justify-between w-3/4 mb-6">
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center"
          >
            <Text className="text-3xl font-bold text-gray-800">
              {code[index] || ""}
            </Text>
          </View>
        ))}
      </View>

      {/* Resend Timer */}
      <View className="flex-row items-center mb-10">
        <Text className="text-gray-800 font-medium">(2:10) </Text>
        <Text className="text-gray-400">Resend Code? </Text>
        <TouchableOpacity>
          <Text className="text-brand-green underline font-medium">
            Click here
          </Text>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        onPress={onVerifyPress}
        className={`w-3/4 py-4 rounded-full items-center mb-10 shadow-sm ${
          code.length === 4
            ? "bg-brand-green shadow-brand-green/30"
            : "bg-brand-green/50"
        }`}
        disabled={code.length !== 4}
      >
        <Text className="text-white font-bold text-lg">Verify</Text>
      </TouchableOpacity>

      {/* Custom Mockup Number Pad */}
      <View className="bg-gray-200 w-full mt-auto pt-6 pb-12 px-6 rounded-t-3xl items-center">
        <Text className="text-gray-500 mb-4">{code || "Enter code"}</Text>

        <View className="flex-row flex-wrap justify-between w-full max-w-xs">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleNumberPress(num)}
              className="w-[30%] bg-white py-4 mb-3 rounded-lg items-center shadow-sm"
            >
              <Text className="text-xl text-gray-800">{num}</Text>
            </TouchableOpacity>
          ))}

          {/* Empty space bottom left */}
          <View className="w-[30%]" />

          <TouchableOpacity
            onPress={() => handleNumberPress("0")}
            className="w-[30%] bg-white py-4 mb-3 rounded-lg items-center shadow-sm"
          >
            <Text className="text-xl text-gray-800">0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="w-[30%] bg-white py-4 mb-3 rounded-lg items-center justify-center shadow-sm"
          >
            <Text className="text-xl text-gray-800">⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
