import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DOCTORS_LIST } from "../constants/doctors";

export default function PopularDoctorsSection() {
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

      {DOCTORS_LIST.slice(0, 3).map((doctor) => (
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
              <Text className="text-gray-400 text-sm">{doctor.specialty}</Text>
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
  );
}
