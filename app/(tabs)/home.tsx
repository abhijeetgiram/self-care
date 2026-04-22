import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Categories from "@/components/Categories";
import PopularDoctors from "@/components/PopularDoctors";
import HomeSkeleton from "../../components/HomeSkeleton";
import RecentSection from "../../components/RecentSection";
import { USER_PROFILE } from "../../constants/user"; // <-- Import the constant

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
        {isLoading ? (
          <HomeSkeleton />
        ) : (
          <>
            {/* Dynamic Header Section */}
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-3xl font-bold text-gray-900">
                  Welcome Back, {USER_PROFILE.firstName}!
                </Text>
                <Text className="text-gray-400 mt-1 font-medium">
                  📍 {USER_PROFILE.location}
                </Text>
              </View>
              <Image
                source={{ uri: USER_PROFILE.image }}
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
            <Categories />
            <PopularDoctors />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
