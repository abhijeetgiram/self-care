import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We built custom headers inside the screens, so hide the default
        tabBarActiveTintColor: "#10B981", // This is a nice Emerald Green
        tabBarInactiveTintColor: "#9CA3AF", // Gray-400 for unselected tabs
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6", // Very light gray border
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
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
          title: "", // No title so the button sits perfectly in the middle
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-14 h-14 items-center justify-center rounded-full -mt-4 shadow-sm ${
                focused
                  ? "bg-brand-green shadow-brand-green/40"
                  : "bg-brand-green/80"
              }`}
            >
              <Ionicons name="add" size={32} color="white" />
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
