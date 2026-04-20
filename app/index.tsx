import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
      {/* Mocking the Cross Logo using basic views */}
      <View className="flex-row items-center justify-center mb-6">
        <Text className="text-brand-green text-5xl font-extrabold mr-1">+</Text>
        <Text className="text-brand-purple text-5xl font-extrabold ml-1">
          +
        </Text>
      </View>

      <Text className="text-3xl font-bold text-gray-900 mb-32">Self Care</Text>

      <View className="absolute bottom-20">
        <Text className="text-gray-400 font-medium text-base">Loading...</Text>
      </View>
    </SafeAreaView>
  );
}
