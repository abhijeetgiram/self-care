import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext"; // Import our auth context

export default function Profile() {
  const { signOut } = useAuth(); // Grab the logout function

  // Mock user data we set up
  const user = {
    fullName: "Abhijeet Giram",
    email: "abhijeet@example.com",
    gender: "Male",
    dob: "01 July 1994",
    location: "Magarpatta City, Pune",
    image:
      "https://ui-avatars.com/api/?name=Abhijeet+Giram&background=7ED9A4&color=fff&bold=true",
  };

  // Reusable component for the detail rows to keep the code clean
  const InfoRow = ({
    label,
    value,
    isLast,
  }: {
    label: string;
    value: string;
    isLast?: boolean;
  }) => (
    <View
      className={`flex-row justify-between items-center py-4 ${!isLast ? "border-b border-gray-100" : ""}`}
    >
      <Text className="text-gray-500 font-medium text-base">{label}</Text>
      <Text className="text-gray-900 font-bold text-base">{value}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <Text className="text-3xl font-bold text-gray-900">Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Top Section: Avatar, Name, and Email */}
        <View className="items-center mb-8">
          <View className="relative shadow-sm shadow-brand-green/20 rounded-full mb-4">
            <Image
              source={{ uri: user.image }}
              className="w-28 h-28 rounded-full border-4 border-white"
            />
            {/* Small edit icon badge */}
            <TouchableOpacity className="absolute bottom-0 right-0 bg-brand-green w-8 h-8 rounded-full border-2 border-white items-center justify-center">
              <Text className="text-white text-xs">✏️</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {user.fullName}
          </Text>
          <Text className="text-gray-400 font-medium">{user.email}</Text>
        </View>

        {/* Personal Information Card */}
        <Text className="text-lg font-bold text-gray-900 mb-3 ml-2">
          Personal Information
        </Text>
        <View className="bg-white rounded-3xl p-5 shadow-sm shadow-gray-100 mb-8">
          <InfoRow label="Gender" value={user.gender} />
          <InfoRow label="Date of Birth" value={user.dob} />
          <InfoRow label="Location" value={user.location} isLast={true} />
        </View>

        {/* App Settings / Legal Card (Optional, for realistic UI) */}
        <Text className="text-lg font-bold text-gray-900 mb-3 ml-2">
          Settings
        </Text>
        <View className="bg-white rounded-3xl p-5 shadow-sm shadow-gray-100 mb-8">
          <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-700 font-medium">Notifications</Text>
            <Text className="text-gray-300 font-bold">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-700 font-medium">Privacy Policy</Text>
            <Text className="text-gray-300 font-bold">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="text-gray-700 font-medium">Terms of Service</Text>
            <Text className="text-gray-300 font-bold">{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={signOut}
          className="bg-red-50 py-4 rounded-2xl items-center border border-red-100 mb-12 shadow-sm"
        >
          <Text className="text-red-500 font-bold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
