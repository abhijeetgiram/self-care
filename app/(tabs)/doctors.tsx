import { Link } from "expo-router";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DOCTORS_LIST } from "../../constants/doctors"; // Import the data!

export default function Doctors() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Fixed Header */}
      <View className="px-6 pt-4 pb-2 bg-gray-50 z-10">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Doctors</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-gray-200 mb-4">
          <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
          <TextInput
            placeholder='Example "heart"'
            className="flex-1 text-gray-800 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Quick Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-2"
        >
          {["#heart", "#teeth", "#Surgeon", "#eyes", "#bones"].map(
            (tag, index) => (
              <TouchableOpacity
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-lg mr-3 border border-gray-200"
              >
                <Text className="text-gray-500 font-medium">{tag}</Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View className="mb-8 mt-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Categories
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-white rounded-3xl p-4 items-center w-[30%] shadow-sm shadow-gray-100">
              <View className="w-12 h-12 rounded-full bg-red-50 items-center justify-center mb-2">
                <Text className="text-red-400 text-2xl">❤️</Text>
              </View>
              <Text className="text-gray-800 text-xs font-bold text-center">
                Cardiologist
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-3xl p-4 items-center w-[30%] shadow-sm shadow-gray-100">
              <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mb-2">
                <Text className="text-blue-400 text-2xl">👁️</Text>
              </View>
              <Text className="text-gray-800 text-xs font-bold text-center">
                Ophthalmologist
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-3xl p-4 items-center w-[30%] shadow-sm shadow-gray-100">
              <View className="w-12 h-12 rounded-full bg-yellow-50 items-center justify-center mb-2">
                <Text className="text-yellow-500 text-2xl">🦷</Text>
              </View>
              <Text className="text-gray-800 text-xs font-bold text-center">
                Dentist
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* All Doctors List */}
        <View className="mb-24">
          <Text className="text-xl font-bold text-gray-900 mb-4">All</Text>

          {/* Map directly over the imported DOCTORS_LIST */}
          {DOCTORS_LIST.map((doctor) => (
            <Link href={`/doctor/${doctor.id}`} asChild key={doctor.id}>
              <TouchableOpacity className="bg-white rounded-3xl p-4 flex-row items-center shadow-sm shadow-gray-100 mb-4">
                <Image
                  source={{ uri: doctor.image }}
                  className="w-16 h-16 rounded-2xl bg-gray-100 mr-4"
                />
                <View className="flex-1">
                  <Text className="text-gray-900 font-bold text-lg">
                    {doctor.name}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    {doctor.specialty}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-gray-900 font-bold text-sm">
                    ★ {doctor.rating}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    ({doctor.reviews} reviews)
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
