import { USER_PROFILE } from "@/constants/user";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { signOut } = useAuth();

  // Created a local state to hold the profile image
  const [profileImage, setProfileImage] = useState(USER_PROFILE.image);

  // Shared options to ensure consistency between gallery/camera crops
  const pickerOptions = {
    allowsEditing: true, // Let user crop to a square
    aspect: [1, 1] as [number, number], // Force a square ratio for circular mask
    quality: 0.7, // Compress for mobile performance
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Don't pick videos
  };

  // Handles the Gallery (Media Library) flow, including permission request and image picking
  const handlePickFromGallery = async () => {
    // Request Gallery (Media Library) Permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need gallery access to change your picture.",
      );
      return;
    }

    // Launch the standard device picker (file system)
    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

    // Dynamic State Update with file:// URI
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Handles the Camera flow, including permission request and launching the camera interface
  const handleLaunchCamera = async () => {
    // Request Camera Permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera access to change your picture.",
      );
      return;
    }

    // Launch the active camera stream
    const result = await ImagePicker.launchCameraAsync(pickerOptions);

    // Dynamic State Update
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Function to manage the profile photo update flow, giving users the choice between camera and gallery
  const handleManageProfilePhoto = () => {
    Alert.alert(
      "Update Profile Photo",
      "Would you like to take a new photo or choose one from your gallery?",
      [
        {
          text: "Choose from Gallery",
          onPress: handlePickFromGallery,
        },
        {
          text: "Take a Photo",
          onPress: handleLaunchCamera,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  // Function to handle Camera or Gallery
  const handleEditPhoto = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera access to change your picture.",
      );
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Let user crop the photo to a square
      aspect: [1, 1],
      quality: 0.7, // Compress it a bit for better performance
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Reusable component for displaying profile information rows
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
      <View className="px-6 pt-4 pb-6">
        <Text className="text-3xl font-bold text-gray-900">Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <View className="relative shadow-sm shadow-brand-green/20 rounded-full mb-4">
            <Image
              // Still uses your solid state logic here
              source={{ uri: profileImage }}
              className="w-28 h-28 rounded-full border-4 border-white bg-gray-200"
            />
            {/* Overlay button for editing the profile picture */}
            <TouchableOpacity
              onPress={handleManageProfilePhoto}
              className="absolute bottom-0 right-0 bg-brand-green w-10 h-10 rounded-full border-4 border-white items-center justify-center shadow-md"
              activeOpacity={0.8}
            >
              {/* Changed icon for general edit, not just camera */}
              <Text className="text-white text-lg">✎</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {USER_PROFILE.fullName}
          </Text>
          <Text className="text-gray-400 font-medium">
            {USER_PROFILE.email}
          </Text>
        </View>

        {/* Personal Information Card */}
        <Text className="text-lg font-bold text-gray-900 mb-3 ml-2">
          Personal Information
        </Text>
        <View className="bg-white rounded-3xl p-5 shadow-sm shadow-gray-100 mb-8">
          <InfoRow label="Gender" value={USER_PROFILE.gender} />
          <InfoRow label="Date of Birth" value={USER_PROFILE.dob} />
          <InfoRow
            label="Location"
            value={USER_PROFILE.location}
            isLast={true}
          />
        </View>

        {/* Settings Card */}
        <Text className="text-lg font-bold text-gray-900 mb-3 ml-2">
          Settings
        </Text>
        <View className="bg-white rounded-3xl p-5 shadow-sm shadow-gray-100 mb-8">
          <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-300 font-medium">Notifications</Text>
            <Text className="text-gray-300 font-bold">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-300 font-medium">Privacy Policy</Text>
            <Text className="text-gray-300 font-bold">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="text-gray-300 font-medium">Terms of Service</Text>
            <Text className="text-gray-300 font-bold">{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={signOut}
          className="bg-red-50 py-4 rounded-2xl items-center border border-red-100 mb-12"
        >
          <Text className="text-red-500 font-bold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
