import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import our modular UI components
import CategoriesSection from "../../components/CategoriesSection";
import PopularDoctorsSection from "../../components/PopularDoctorsSection";
import RecentSection from "../../components/RecentSection";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/(tabs)/doctors",
        params: { query: searchQuery },
      });
      setSearchQuery("");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold text-gray-900">
              Welcome Back, Abhijeet!
            </Text>
            <Text className="text-gray-400 mt-1 font-medium">
              📍 Magarpatta City, Pune
            </Text>
          </View>
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Abhijeet+Giram&background=7ED9A4&color=fff&bold=true",
            }}
            className="w-12 h-12 rounded-full bg-gray-200"
          />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-gray-200 mb-8">
          <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
          <TextInput
            placeholder='Example "heart"'
            className="flex-1 text-gray-800 text-base"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        {/* UI Modules */}
        <RecentSection />
        <CategoriesSection />
        <PopularDoctorsSection />
      </ScrollView>
    </SafeAreaView>
  );
}
