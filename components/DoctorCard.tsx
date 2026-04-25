import { Doctor } from "@/models/doctor";
import { Link } from "expo-router";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/doctor/${doctor.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-white rounded-3xl p-4 flex-row items-center mb-4"
      >
        <Animated.View
          {...({ sharedTransitionTag: `doctor-image-${doctor.id}` } as any)}
        >
          <Image
            source={{ uri: doctor.image }}
            className="w-16 h-16 rounded-2xl"
          />
        </Animated.View>
        <View className="flex-1 ml-4">
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
