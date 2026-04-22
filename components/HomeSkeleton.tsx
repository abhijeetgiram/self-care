import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function HomeSkeleton() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Shimmer loop animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <MaskedView
      style={{ flex: 1, minHeight: 800 }}
      maskElement={
        <View className="flex-1 bg-transparent mb-24">
          {/*  Header Mask (Welcome UserName + Avatar) */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <View className="w-48 h-8 bg-black rounded-lg mb-2" />
              <View className="w-32 h-4 bg-black rounded-md" />
            </View>
            <View className="w-12 h-12 bg-black rounded-full" />
          </View>

          {/* Search Bar Mask */}
          <View className="w-full h-14 bg-black rounded-2xl mb-8" />

          {/* Recent Section Mask */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <View className="w-20 h-6 bg-black rounded-md" />
              <View className="w-12 h-4 bg-black rounded-md" />
            </View>
            <View className="flex-row overflow-hidden">
              {/* Horizontal Scroll Cards */}
              <View className="w-72 h-36 bg-black rounded-3xl mr-4" />
              <View className="w-72 h-36 bg-black rounded-3xl" />
            </View>
          </View>

          {/* Categories Mask */}
          <View className="mb-8">
            <View className="w-24 h-6 bg-black rounded-md mb-4" />
            <View className="flex-row justify-between">
              <View className="w-[23%] h-24 bg-black rounded-2xl" />
              <View className="w-[23%] h-24 bg-black rounded-2xl" />
              <View className="w-[23%] h-24 bg-black rounded-2xl" />
              <View className="w-[23%] h-24 bg-black rounded-2xl" />
            </View>
          </View>

          {/* Popular Doctors Header Mask */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="w-36 h-6 bg-black rounded-md" />
            <View className="w-12 h-4 bg-black rounded-md" />
          </View>
          <View className="w-full h-24 bg-black rounded-3xl mb-4" />
          <View className="w-full h-24 bg-black rounded-3xl" />
        </View>
      }
    >
      {/* Background and animated shimmer gradient */}
      <View className="flex-1 bg-gray-200" />
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
