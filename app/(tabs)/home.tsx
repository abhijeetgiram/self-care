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

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header Section */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold text-gray-900">
              Welcome Back, Abhijeet!
            </Text>
            <Text className="text-gray-400 mt-1 font-medium">
              📍 Magarpatta City, Pune
            </Text>
          </View>
          {/* User Profile using UI Avatars matching your brand green */}
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Abhijeet+Giram&background=7ED9A4&color=fff&bold=true",
            }}
            className="w-12 h-12 rounded-full bg-gray-200"
          />
        </View>

        {/* 2. Search Bar */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-gray-200 mb-8">
          <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
          <TextInput
            placeholder='Example "heart"'
            className="flex-1 text-gray-800 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 3. Recent Section (Horizontal Scroll) */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Recent</Text>
            <TouchableOpacity>
              <Text className="text-gray-900 font-medium text-sm">See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="overflow-visible"
          >
            {/* Blue Doctor Card */}
            <Link href={`/doctor/5`} asChild>
              <TouchableOpacity className="bg-[#6B8FE8] rounded-3xl p-5 mr-4 w-72 shadow-sm shadow-blue-200">
                <View className="flex-row items-center mb-4">
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/women/24.jpg?nat=in",
                    }}
                    className="w-12 h-12 rounded-full bg-blue-300 mr-3"
                  />
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg">
                      Dr. Anjali Patil
                    </Text>
                    <Text className="text-blue-100 text-sm">Cardiologist</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-white font-bold text-xs">★ 4.8</Text>
                    <Text className="text-blue-100 text-[10px]">
                      (220 reviews)
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-blue-100 font-medium">📅 23 Mar</Text>
                  <Text className="text-blue-100 font-medium">🕒 16:00</Text>
                  <Text className="text-white font-bold text-lg">₹1500</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* Orange Blood Test Card */}
            <TouchableOpacity className="bg-[#F47E60] rounded-3xl p-5 w-72 shadow-sm shadow-orange-200">
              <View className="mb-4">
                <Text className="text-white font-bold text-xl mb-1">
                  Blood test
                </Text>
                <Text className="text-orange-100 text-sm w-3/4">
                  Complete Hemogram (CBC)
                </Text>
              </View>
              <View className="flex-row justify-between items-center mt-auto">
                <Text className="text-orange-100 font-medium">📅 23 Mar</Text>
                <Text className="text-white text-2xl opacity-80">🩸</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* 4. Categories Section */}
        <View className="mb-8">
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

        {/* 5. Popular Doctors Section */}
        <View className="mb-24">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Popular Doctors
            </Text>
            <TouchableOpacity>
              <Text className="text-gray-900 font-medium text-sm">See all</Text>
            </TouchableOpacity>
          </View>

          {/* Doctor Card */}
          <Link href={`/doctor/1`} asChild>
            <TouchableOpacity className="bg-white rounded-3xl p-4 flex-row items-center shadow-sm shadow-gray-100 mb-4">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/42.jpg?nat=in",
                }}
                className="w-16 h-16 rounded-2xl bg-gray-100 mr-4"
              />
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-lg">
                  Dr. Rahul Deshmukh
                </Text>
                <Text className="text-gray-400 text-sm">Pediatrics</Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-900 font-bold text-sm">★ 4.9</Text>
                <Text className="text-gray-400 text-xs">(123 reviews)</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
