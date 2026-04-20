import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddQuickAction() {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 items-center justify-center px-8"
      edges={["top"]}
    >
      {/* Soft Graphic/Icon Container */}
      <View className="w-32 h-32 bg-brand-green/10 rounded-full items-center justify-center mb-8">
        <Text className="text-6xl">✨</Text>
      </View>

      {/* Heading */}
      <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
        Quick Actions
      </Text>

      {/* Helpful Subtitle */}
      <Text className="text-gray-400 text-center text-base mb-10 leading-relaxed px-4">
        Soon you will be able to instantly upload health records, log daily
        symptoms, and book emergency visits right from here!
      </Text>

      {/* Redirect CTA (Call to Action) */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/home")}
        className="w-full bg-brand-green py-4 rounded-full items-center shadow-sm shadow-brand-green/30"
      >
        <Text className="text-white font-bold text-lg">
          Return to Dashboard
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
