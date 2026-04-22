import Categories from "@/components/Categories";
import PopularDoctors from "@/components/PopularDoctors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSkeleton from "../../components/HomeSkeleton";
import RecentSection from "../../components/RecentSection";
import { USER_PROFILE } from "../../constants/user";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Initial Page Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // DEBOUNCE SEARCH LOGIC
  useEffect(() => {
    // Only trigger if user has typed something
    if (searchQuery.trim().length === 0) return;

    // Wait 600ms after typing stops before navigating
    const delayDebounceFn = setTimeout(() => {
      router.push({
        pathname: "/(tabs)/doctors",
        params: { query: searchQuery },
      });

      // Clear search after navigating so it's fresh when they return
      setSearchQuery("");
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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
            {/* Header Section */}
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-3xl font-bold text-gray-900">
                  Welcome Back, {USER_PROFILE.firstName}!
                </Text>
                <Text className="text-gray-400 mt-1 font-medium">
                  📍 {USER_PROFILE.location}
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
                <Image
                  source={{ uri: USER_PROFILE.image }}
                  className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm"
                />
              </TouchableOpacity>
            </View>

            {/* Search Bar with Clear Icon & Debounce */}
            <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-gray-200 mb-8">
              <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
              <TextInput
                placeholder='Example "Heart" or "Dentist"'
                className="flex-1 text-gray-800 text-base"
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Text className="text-gray-400 px-2 text-xl font-light">
                    ✕
                  </Text>
                </TouchableOpacity>
              )}
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
