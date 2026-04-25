import { DOCTORS_LIST } from "@/constants/doctors";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import DoctorCard from "./DoctorCard";

export default function PopularDoctors() {
  const router = useRouter();

  const navigateToDoctorsList = () => {
    router.push({ pathname: "/(tabs)/doctors", params: { query: "" } });
  };

  return (
    <View className="mb-24">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Popular Doctors</Text>
        <TouchableOpacity onPress={navigateToDoctorsList}>
          <Text className="text-gray-900 font-medium text-sm">See all</Text>
        </TouchableOpacity>
      </View>

      {/* Map using our reusable component! */}
      {DOCTORS_LIST.slice(0, 3).map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </View>
  );
}
