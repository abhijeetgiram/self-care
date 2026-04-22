import Logo from "@/components/AppLogo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Animated, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Wait 2.5 seconds then go to Auth
    const timer = setTimeout(() => {
      router.replace("/(auth)/sign-in");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-brand-green/5 items-center justify-center">
      <Animated.View style={{ opacity: fadeAnim }} className="items-center">
        <Logo />

        <Text className="text-gray-900 text-3xl font-bold mt-6 tracking-tight">
          Self<Text className="text-brand-green">Care</Text>
        </Text>

        <Text className="text-gray-400 text-sm mt-2 font-medium tracking-widest uppercase">
          Your Health, Simplified
        </Text>
      </Animated.View>

      {/* Bottom version text */}
      <View className="absolute bottom-12">
        <Text className="text-gray-300 text-xs font-bold">VERSION 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}
