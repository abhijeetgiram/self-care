import { Doctor } from "@/models/doctor";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/doctor/${doctor.id}`} asChild>
      <TouchableOpacity className="bg-white rounded-3xl p-4 flex-row items-center shadow-sm shadow-gray-100 mb-4">
        <Image
          source={{ uri: doctor.image }}
          className="w-16 h-16 rounded-2xl bg-gray-100 mr-4"
        />
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-lg">{doctor.name}</Text>
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
  );
}
