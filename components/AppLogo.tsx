import { Text, View } from "react-native";

export default function AppLogo() {
  return (
    <View className="items-center mb-10 mt-10">
      <View className="flex-row">
        <Text className="text-brand-green text-3xl font-bold">+</Text>
        <Text className="text-brand-purple text-3xl font-bold">+</Text>
      </View>
    </View>
  );
}
