import { RECENT_ACTIVITIES } from "@/constants/activities";
import { DOCTORS_LIST } from "@/constants/doctors";
import { ActivityType } from "@/models/common";
import { Link, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RecentSection() {
  const router = useRouter();

  const navigateToDoctorsList = () => {
    router.push({ pathname: "/(tabs)/doctors", params: { query: "" } });
  };

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
        {RECENT_ACTIVITIES.map((item, index) => {
          // If it is a Doctor Visit card
          if (item.type === ActivityType.Doctor) {
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

          // If it is a Lab Test card
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
