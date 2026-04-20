import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DOCTORS_LIST } from "../../constants/doctors"; // <-- Import the centralized data!

export default function DoctorDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Gets the ID from the URL

  // Find the specific doctor from our constants file
  const doctor = DOCTORS_LIST.find((d) => d.id === id) || DOCTORS_LIST[0];

  // State for interactive booking selection
  const [selectedDate, setSelectedDate] = useState("26");
  const [selectedTime, setSelectedTime] = useState("13:00");

  const dates = [
    { day: "23", month: "March" },
    { day: "25", month: "March" },
    { day: "26", month: "March" },
    { day: "30", month: "March" },
    { day: "31", month: "March" },
  ];

  const times = ["9:00", "12:00", "13:00", "16:00", "16:30"];

  const onMakeAppointment = () => {
    // Navigate to the payment screen, passing the booking details
    router.push({
      pathname: "/doctor/payment",
      params: {
        doctorId: doctor.id,
        date: `${selectedDate} March`,
        time: selectedTime,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-6 bg-white rounded-b-[40px] shadow-sm shadow-gray-100 z-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-gray-800 text-lg font-bold">{"< Back"}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-gray-400 text-2xl tracking-widest">...</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-6 -mt-10 pt-16"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center">
            <View className="relative">
              <Image
                source={{ uri: doctor.image }}
                className="w-20 h-20 rounded-2xl bg-gray-200"
              />
              <View className="absolute -bottom-2 -left-2 bg-white px-2 py-1 rounded-full shadow-sm">
                <Text className="text-xs font-bold text-gray-800">
                  ★ {doctor.rating}
                </Text>
              </View>
            </View>
            <View className="ml-4">
              <Text className="text-xl font-bold text-gray-900">
                {doctor.name}
              </Text>
              <Text className="text-gray-400 mt-1">{doctor.specialty}</Text>
              <View className="flex-row mt-3 gap-3">
                <TouchableOpacity className="bg-brand-green/20 p-2 rounded-full">
                  <Text className="text-brand-green">💬</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-blue-500/20 p-2 rounded-full">
                  <Text className="text-blue-500">📞</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text className="text-3xl font-bold text-gray-900">
            {doctor.price}
          </Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-between mb-8">
          <View className="bg-white rounded-2xl p-4 items-center w-[30%] shadow-sm shadow-gray-100">
            <Text className="text-gray-400 text-xs mb-2">Patients</Text>
            <Text className="text-gray-900 font-bold text-lg">
              {doctor.patients}
            </Text>
          </View>
          <View className="bg-white rounded-2xl p-4 items-center w-[30%] shadow-sm shadow-gray-100">
            <Text className="text-gray-400 text-xs mb-2">Experiences</Text>
            <Text className="text-gray-900 font-bold text-lg">
              {doctor.exp}
            </Text>
          </View>
          <View className="bg-white rounded-2xl p-4 items-center w-[30%] shadow-sm shadow-gray-100">
            <Text className="text-gray-400 text-xs mb-2">Ratings</Text>
            <Text className="text-gray-900 font-bold text-lg">
              {doctor.rating} ★
            </Text>
          </View>
        </View>

        {/* Schedule (Dates) */}
        <Text className="text-xl font-bold text-gray-900 mb-4">Schedule</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8 overflow-visible"
        >
          {dates.map((item, index) => {
            const isSelected = selectedDate === item.day;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(item.day)}
                className={`rounded-2xl p-4 mr-3 items-center justify-center min-w-[70px] shadow-sm ${
                  isSelected
                    ? "bg-brand-green shadow-brand-green/30"
                    : "bg-white shadow-gray-100"
                }`}
              >
                <Text
                  className={`font-bold text-xl mb-1 ${isSelected ? "text-white" : "text-gray-900"}`}
                >
                  {item.day}
                </Text>
                <Text
                  className={`text-xs ${isSelected ? "text-white/80" : "text-gray-400"}`}
                >
                  {item.month}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time Slots */}
        <Text className="text-xl font-bold text-gray-900 mb-4">Time</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          {times.map((time, index) => {
            const isSelected = selectedTime === time;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedTime(time)}
                className={`rounded-xl py-3 px-6 shadow-sm ${
                  isSelected
                    ? "bg-brand-green shadow-brand-green/30"
                    : "bg-white shadow-gray-100"
                }`}
              >
                <Text
                  className={`font-bold ${isSelected ? "text-white" : "text-gray-600"}`}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Location Placeholder */}
        <Text className="text-xl font-bold text-gray-900 mb-4">Location</Text>
        <View className="flex-row items-center mb-6">
          <Text className="text-gray-400 mr-2">📍</Text>
          <Text className="text-gray-500 flex-1">{doctor.location}</Text>
        </View>
        <View className="w-full h-32 bg-gray-200 rounded-2xl mb-32 items-center justify-center">
          <Text className="text-gray-400">Map Area Placeholder</Text>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-8 left-6 right-6">
        <TouchableOpacity
          onPress={onMakeAppointment}
          className="bg-brand-green py-5 rounded-full items-center shadow-lg shadow-brand-green/40 flex-row justify-center"
        >
          <Text className="text-white font-bold text-lg mr-2">
            ● Make appointment
          </Text>
          <Text className="text-white font-bold text-lg"> {">>"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
