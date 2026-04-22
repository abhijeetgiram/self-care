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
  const { query } = useLocalSearchParams<{ query?: string }>();

  const [localSearch, setLocalSearch] = useState(query || "");
  const [isSearching, setIsSearching] = useState(false);

  // DEBOUNCE SEARCH LOGIC
  useEffect(() => {
    // Don't trigger if the search is already exactly what's in the URL
    if (localSearch === query) return;

    // Set a timer to update the URL after 500ms of no typing
    const delayDebounceFn = setTimeout(() => {
      router.setParams({ query: localSearch });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [localSearch]);

  // Handle the skeleton state when the URL query actually changes
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 600);
    return () => clearTimeout(timer);
  }, [query]);

  const displayedDoctors = query
    ? DOCTORS_LIST.filter((doctor) => {
        const searchTerm = query.toLowerCase();

        // Check Name
        const matchesName = doctor.name.toLowerCase().includes(searchTerm);

        // Check Specialty
        const matchesSpecialty = doctor.specialty
          .toLowerCase()
          .includes(searchTerm);

        // Check Keywords Array
        const matchesKeywords = doctor.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm),
        );

        return matchesName || matchesSpecialty || matchesKeywords;
      })
    : DOCTORS_LIST;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="px-6 pt-4 pb-2 bg-gray-50 z-10">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Doctors</Text>

        {/* Search Bar with Clear Icon */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-gray-200 mb-4">
          <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
          <TextInput
            placeholder='Example "Heart" or "Dentist"'
            className="flex-1 text-gray-800 text-base"
            placeholderTextColor="#9CA3AF"
            value={localSearch}
            onChangeText={setLocalSearch}
          />
          {localSearch.length > 0 && (
            <TouchableOpacity onPress={() => setLocalSearch("")}>
              <Text className="text-gray-400 px-2 text-lg">✕</Text>
            </TouchableOpacity>
          )}
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
              onPress={() => setLocalSearch(tag)} // Now updates localSearch to trigger debounce
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
        {/* Rest of Categories and mapping (using DoctorCard) */}
        <View className="mb-24 mt-4">
          {/* category UI  */}
          <View className="flex-row items-center justify-between mb-4 mt-8">
            <Text className="text-xl font-bold text-gray-900">
              {query ? `Results for "${query}"` : "All Doctors"}
            </Text>
            {!isSearching && (
              <Text className="text-gray-400 font-medium">
                {displayedDoctors.length} found
              </Text>
            )}
          </View>

          {isSearching ? (
            <>
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
            </>
          ) : displayedDoctors.length === 0 ? (
            <View className="items-center justify-center py-10">
              <Text className="text-gray-500">No results found.</Text>
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
