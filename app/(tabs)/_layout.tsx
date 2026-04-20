import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the default top header
        tabBarShowLabel: false, // Hide text labels under icons
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingTop: 10,
        },
      }}
    >
      {/* 1. Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              className={`text-2xl ${focused ? "text-brand-green" : "text-gray-300"}`}
            >
              ⌂
            </Text>
          ),
        }}
      />

      {/* 2. Records/Appointments Tab */}
      <Tabs.Screen
        name="appointments"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              className={`text-2xl ${focused ? "text-brand-green" : "text-gray-300"}`}
            >
              📄
            </Text>
          ),
        }}
      />

      {/* 3. Center Add Button Tab */}
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: () => (
            <View className="bg-brand-green w-14 h-14 rounded-full items-center justify-center shadow-sm -mt-5">
              <Text className="text-white text-3xl font-light">+</Text>
            </View>
          ),
        }}
      />

      {/* 4. Doctors List Tab */}
      <Tabs.Screen
        name="doctors"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              className={`text-2xl ${focused ? "text-brand-green" : "text-gray-300"}`}
            >
              🩺
            </Text>
          ),
        }}
      />

      {/* 5. Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              className={`text-2xl ${focused ? "text-brand-green" : "text-gray-300"}`}
            >
              👤
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
