import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("visit");

  const onPayPress = () => {
    // Complete the transaction and show success screen
    router.push("/doctor/success");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-6 pt-4 pb-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-gray-800 text-lg font-bold">{"< Back"}</Text>
        </TouchableOpacity>
      </View>

      <View className="px-6 flex-1 pt-4">
        <Text className="text-3xl font-bold text-gray-900 mb-10">
          Payment Options
        </Text>

        {/* Option 1: Pay on visit */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("visit")}
          className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-100 flex-row items-center"
        >
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 ${
              selectedMethod === "visit"
                ? "border-brand-green"
                : "border-gray-300"
            }`}
          >
            {selectedMethod === "visit" && (
              <View className="w-3 h-3 rounded-full bg-brand-green" />
            )}
          </View>
          <Text className="text-lg font-bold text-gray-900">
            Pay on a visit
          </Text>
        </TouchableOpacity>

        {/* Option 2: UPI */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("upi")}
          className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-100 flex-row items-center"
        >
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 ${
              selectedMethod === "upi"
                ? "border-brand-green"
                : "border-gray-300"
            }`}
          >
            {selectedMethod === "upi" && (
              <View className="w-3 h-3 rounded-full bg-brand-green" />
            )}
          </View>
          <Text className="text-lg font-bold text-gray-900">UPI</Text>
        </TouchableOpacity>
      </View>

      {/* Pay Button */}
      <View className="p-6 pb-12">
        <TouchableOpacity
          onPress={onPayPress}
          className="w-full bg-brand-green py-4 rounded-full items-center shadow-sm shadow-brand-green/30"
        >
          <Text className="text-white font-bold text-lg">Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
