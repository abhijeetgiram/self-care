import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Success() {
  const router = useRouter();

  const onGoHome = () => {
    // Replace clears the stack so they can't hit "back" to go to the success screen again
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-green" edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center px-8">
        {/* Mocking the Cross Logo using basic views */}
        <View className="flex-row items-center justify-center mb-8">
          <Text className="text-white text-5xl font-extrabold mr-1">+</Text>
          <Text className="text-brand-purple text-5xl font-extrabold ml-1">
            +
          </Text>
        </View>

        <Text className="text-white text-3xl font-bold mb-10">Self Care</Text>

        <Text className="text-white text-4xl font-bold mb-8">Thank you!</Text>

        {/* Checkmark Circle */}
        <View className="w-24 h-24 rounded-full border-4 border-white items-center justify-center mb-10">
          <Text className="text-white text-5xl font-bold">✓</Text>
        </View>

        <Text className="text-white text-center text-lg font-medium leading-relaxed px-4">
          Your visit has been successfully reserved, please pay for it to get an
          appointment with the selected doctor
        </Text>
      </View>

      {/* Go to Home Button */}
      <View className="px-6 pb-12 items-center">
        <TouchableOpacity onPress={onGoHome}>
          <Text className="text-white text-lg font-bold underline">
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
