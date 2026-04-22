import { Link, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DOCTORS_LIST } from "../constants/doctors"; // Import our centralized data

export default function RecentSection() {
  const router = useRouter();

  const navigateToDoctorsList = () => {
    router.push({ pathname: "/(tabs)/doctors", params: { query: "" } });
  };

  // Configuration Array: A mix of specific doctor visits (by ID) and lab tests
  const recentActivity = [
    {
      type: "doctor",
      id: "5",
      date: "23 Mar",
      time: "16:00",
      theme: {
        bg: "bg-[#6B8FE8]",
        shadow: "shadow-blue-200",
        text: "text-blue-100",
      },
    },
    {
      type: "test",
      title: "Blood test",
      subtitle: "Complete Hemogram (CBC)",
      date: "23 Mar",
      icon: "🩸",
      theme: {
        bg: "bg-[#F47E60]",
        shadow: "shadow-orange-200",
        text: "text-orange-100",
      },
    },
    {
      type: "doctor",
      id: "7",
      date: "15 Mar",
      time: "10:30",
      theme: {
        bg: "bg-[#9B7EDE]",
        shadow: "shadow-purple-200",
        text: "text-purple-100",
      },
    },
    {
      type: "test",
      title: "X-Ray",
      subtitle: "Chest PA View",
      date: "10 Mar",
      icon: "🩻",
      theme: {
        bg: "bg-[#4DB6AC]",
        shadow: "shadow-teal-200",
        text: "text-teal-100",
      },
    },
    {
      type: "doctor",
      id: "4",
      date: "02 Mar",
      time: "18:00",
      theme: {
        bg: "bg-[#5C6BC0]",
        shadow: "shadow-indigo-200",
        text: "text-indigo-100",
      },
    },
  ];

  return (
    <View className="mb-8">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Recent</Text>
        <TouchableOpacity onPress={navigateToDoctorsList}>
          <Text className="text-gray-900 font-medium text-sm">See all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Cards mapped dynamically */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
      >
        {recentActivity.map((item, index) => {
          // 1. If it is a Doctor Visit card
          if (item.type === "doctor") {
            // Find the live data from our constants file
            const doctor = DOCTORS_LIST.find((d) => d.id === item.id);
            if (!doctor) return null; // Failsafe if ID isn't found

            return (
              <Link href={`/doctor/${doctor.id}`} asChild key={index}>
                <TouchableOpacity
                  className={`${item.theme.bg} rounded-3xl p-5 mr-4 w-72 shadow-sm ${item.theme.shadow}`}
                >
                  <View className="flex-row items-center mb-4">
                    <Image
                      source={{ uri: doctor.image }}
                      className="w-12 h-12 rounded-full bg-white/20 mr-3"
                    />
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">
                        {doctor.name}
                      </Text>
                      <Text className={`${item.theme.text} text-sm`}>
                        {doctor.specialty}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-white font-bold text-xs">
                        ★ {doctor.rating}
                      </Text>
                      <Text className={`${item.theme.text} text-[10px]`}>
                        ({doctor.reviews} reviews)
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className={`${item.theme.text} font-medium`}>
                      📅 {item.date}
                    </Text>
                    <Text className={`${item.theme.text} font-medium`}>
                      🕒 {item.time}
                    </Text>
                    <Text className="text-white font-bold text-lg">
                      {doctor.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            );
          }

          // 2. If it is a Lab Test card
          else {
            return (
              <TouchableOpacity
                key={index}
                className={`${item.theme.bg} rounded-3xl p-5 mr-4 w-72 shadow-sm ${item.theme.shadow}`}
              >
                <View className="mb-4">
                  <Text className="text-white font-bold text-xl mb-1">
                    {item.title}
                  </Text>
                  <Text className={`${item.theme.text} text-sm w-3/4`}>
                    {item.subtitle}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center mt-auto">
                  <Text className={`${item.theme.text} font-medium`}>
                    📅 {item.date}
                  </Text>
                  <Text className="text-white text-2xl opacity-80">
                    {item.icon}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
