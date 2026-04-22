import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DoctorCard from "../../components/DoctorCard";
import DoctorCardSkeleton from "../../components/DoctorCardSkeleton";
import { DOCTORS_LIST } from "../../constants/doctors";

export default function Doctors() {
  const router = useRouter();
  // Get the query param from the URL
  const { query } = useLocalSearchParams<{ query?: string }>();

  // Local state for the search bar input specifically
  const [localSearch, setLocalSearch] = useState(query || "");
  const [isSearching, setIsSearching] = useState(false);

  // Trigger a "Loading" effect whenever the URL query changes
  useEffect(() => {
    if (query !== undefined) {
      setLocalSearch(query);

      // Simulate a network search delay
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 800); // Fast 800ms "search" feel

      return () => clearTimeout(timer);
    }
  }, [query]);

  // Handle manual typing in the search bar
  const handleSearchSubmit = () => {
    router.setParams({ query: localSearch });
  };

  // Filter the central list based on the URL query
  const displayedDoctors = query
    ? DOCTORS_LIST.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(query.toLowerCase()),
      )
    : DOCTORS_LIST;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Fixed Header */}
      <View className="px-6 pt-4 pb-2 bg-gray-50 z-10">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Doctors</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-gray-200 mb-4">
          <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
          <TextInput
            placeholder='Example "heart" or "Dentist"'
            className="flex-1 text-gray-800 text-base"
            placeholderTextColor="#9CA3AF"
            value={localSearch}
            onChangeText={setLocalSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>

        {/* Quick Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-2"
        >
          {[
            "Dentist",
            "Cardiologist",
            "Pediatrics",
            "Ophthalmologist",
            "Orthopedist",
          ].map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.setParams({ query: tag })}
              className={`px-4 py-2 rounded-lg mr-3 border ${
                query?.toLowerCase() === tag.toLowerCase()
                  ? "bg-brand-green border-brand-green"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <Text
                className={
                  query?.toLowerCase() === tag.toLowerCase()
                    ? "text-white font-bold"
                    : "text-gray-500 font-medium"
                }
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View className="mb-8 mt-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Categories
          </Text>

          <View className="flex-row justify-between">
            {/* All Category */}
            <TouchableOpacity
              onPress={() => router.setParams({ query: "" })}
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
              onPress={() => router.setParams({ query: "Cardiologist" })}
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
              onPress={() => router.setParams({ query: "Ophthalmologist" })}
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
              onPress={() => router.setParams({ query: "Dentist" })}
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

        {/* Dynamic Filtered Doctors List */}
        <View className="mb-24">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">
              {query ? `Results for "${query}"` : "All Doctors"}
            </Text>
            {!isSearching && (
              <Text className="text-gray-400 font-medium">
                {displayedDoctors.length} found
              </Text>
            )}
          </View>

          {/* Render Skeletons during search, else show data */}
          {isSearching ? (
            <>
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
            </>
          ) : displayedDoctors.length === 0 ? (
            <View className="items-center justify-center py-10">
              <Text className="text-4xl mb-4">🤷‍♂️</Text>
              <Text className="text-gray-500 font-medium text-lg">
                No doctors found.
              </Text>
              <TouchableOpacity
                onPress={() => router.setParams({ query: "" })}
                className="mt-4"
              >
                <Text className="text-brand-green font-bold underline">
                  Clear search
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            displayedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
