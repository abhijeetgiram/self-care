import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Categories() {
  const router = useRouter();

  return (
    <View className="mb-8">
      <Text className="text-xl font-bold text-gray-900 mb-4">Categories</Text>
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: "/(tabs)/doctors", params: { query: "" } })
          }
          className="bg-white rounded-2xl p-3 items-center w-[23%] shadow-sm shadow-gray-100"
        >
          <View className="w-10 h-10 rounded-full bg-brand-green/10 items-center justify-center mb-2">
            <Text className="text-brand-green text-xl">🩺</Text>
          </View>
          <Text className="text-gray-800 text-xs font-bold text-center">
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/doctors",
              params: { query: "Cardiologist" },
            })
          }
          className="bg-white rounded-2xl p-3 items-center w-[23%] shadow-sm shadow-gray-100"
        >
          <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mb-2">
            <Text className="text-red-400 text-xl">❤️</Text>
          </View>
          <Text className="text-gray-800 text-xs font-bold text-center">
            Heart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/doctors",
              params: { query: "Ophthalmologist" },
            })
          }
          className="bg-white rounded-2xl p-3 items-center w-[23%] shadow-sm shadow-gray-100"
        >
          <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mb-2">
            <Text className="text-blue-400 text-xl">👁️</Text>
          </View>
          <Text className="text-gray-800 text-xs font-bold text-center">
            Eyes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/doctors",
              params: { query: "Dentist" },
            })
          }
          className="bg-white rounded-2xl p-3 items-center w-[23%] shadow-sm shadow-gray-100"
        >
          <View className="w-10 h-10 rounded-full bg-yellow-50 items-center justify-center mb-2">
            <Text className="text-yellow-500 text-xl">🦷</Text>
          </View>
          <Text className="text-gray-800 text-xs font-bold text-center">
            Dental
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
