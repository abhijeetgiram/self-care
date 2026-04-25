import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#10B981", // Emerald-600 (high contrast)
        tabBarInactiveTintColor: "#6B7280", // Gray-500 (better visibility than 400)
        tabBarStyle: {
          height: 80, // Increased height for premium feel, crucial for clear labels
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0, // Clean, borderless look
          elevation: 20, // Crisp native shadow on Android
          shadowColor: "#000", // Soft shadow for iOS
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700", // Bolder, easier to read
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      {/* 1. Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 2. Doctors Tab */}
      <Tabs.Screen
        name="doctors"
        options={{
          title: "Doctors",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "medkit" : "medkit-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 3. Add / Quick Action Tab (Floating Style) */}
      <Tabs.Screen
        name="add"
        options={{
          title: "", // No title, keeps the center floating action focused
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-16 h-16 items-center justify-center rounded-full -mt-7 ${
                focused ? "bg-emerald-600" : "bg-emerald-500" // Standard brand color when unselected
              }`}
              style={{
                elevation: 10, // Specific floating shadow
                shadowColor: "#10B981",
                shadowOpacity: 0.4,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },
              }}
            >
              <Ionicons name="add" size={38} color="white" />
            </View>
          ),
        }}
      />

      {/* 4. Appointments / Visits Tab */}
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Visits",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 5. Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
