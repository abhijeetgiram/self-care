import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function DoctorCardSkeleton() {
  // Setup the animation value
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Loop the animation forever
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500, // 1.5 seconds per shimmer sweep
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  // Map the animated value (0 to 1) to screen coordinates (-width to +width)
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <MaskedView
      style={{ height: 96, marginBottom: 16 }} // 96px matches our h-24 card roughly
      maskElement={
        // THE MASK: Everything black will show the shimmer. Everything transparent will be hidden.
        <View className="flex-1 bg-transparent flex-row items-center p-4">
          {/* Avatar Box Mask */}
          <View className="w-16 h-16 rounded-2xl bg-black mr-4" />

          {/* Text Lines Mask */}
          <View className="flex-1">
            <View className="w-40 h-5 rounded-md bg-black mb-2" />
            <View className="w-24 h-4 rounded-md bg-black" />
          </View>

          {/* Ratings Mask */}
          <View className="items-end">
            <View className="w-12 h-4 rounded-md bg-black mb-2" />
            <View className="w-16 h-3 rounded-md bg-black" />
          </View>
        </View>
      }
    >
      {/* THE BACKGROUND: This sits underneath the shimmer */}
      <View className="flex-1 bg-gray-200" />

      {/* THE SHIMMER: An animated gradient moving from left to right */}
      <Animated.View
        style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255, 255, 255, 0.6)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </MaskedView>
  );
}
