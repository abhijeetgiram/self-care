import AppLogo from "@/components/AppLogo";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Verify() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [code, setCode] = useState<string>("");

  // Added state for the timer (130 seconds = 2:10)
  const [timeLeft, setTimeLeft] = useState<number>(130);

  // Created the countdown effect
  useEffect(() => {
    // If timer reaches 0, stop counting
    if (timeLeft <= 0) return;

    // Set an interval to decrease time by 1 every second
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup the interval when the component unmounts or time changes
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Helper function to format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Add a leading zero if seconds are less than 10
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle resending the code
  const handleResendPress = () => {
    // Reset the timer back to 2:10
    setTimeLeft(130);
    // Optionally clear the current entered code
    setCode("");
    // Trigger API call here to send a new email
  };

  // Numpad logic
  const handleNumberPress = (num: string) => {
    if (code.length < 4) setCode(code + num);
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  const onVerifyPress = () => {
    if (code.length === 4) {
      signIn();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-12 items-center">
      {/* Logo */}
      <AppLogo />

      <Text className="text-3xl font-bold text-gray-900 mb-2">Your Code</Text>
      <Text className="text-gray-400 mb-10">Code sent to your Email</Text>

      {/* 4-Digit Code Display */}
      <View className="flex-row justify-between w-3/4 mb-6">
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center"
          >
            <Text className="text-3xl font-bold text-gray-800">
              {code[index] || ""}
            </Text>
          </View>
        ))}
      </View>

      {/* Dynamic Resend Timer */}
      <View className="flex-row items-center mb-10">
        <Text className="text-gray-800 font-medium">
          ({formatTime(timeLeft)}){" "}
        </Text>
        <Text className="text-gray-400">Resend Code? </Text>
        <TouchableOpacity
          onPress={handleResendPress}
          disabled={timeLeft > 0} // Disable button if timer is running
        >
          <Text
            className={`font-medium ${
              timeLeft > 0 ? "text-gray-300" : "text-brand-green underline"
            }`}
          >
            Click here
          </Text>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        onPress={onVerifyPress}
        className={`w-3/4 py-4 rounded-full items-center mb-10 shadow-sm ${
          code.length === 4
            ? "bg-brand-green shadow-brand-green/30"
            : "bg-brand-green/50"
        }`}
        disabled={code.length !== 4}
      >
        <Text className="text-white font-bold text-lg">Verify</Text>
      </TouchableOpacity>

      {/* Custom Mockup Number Pad */}
      <View className="bg-gray-200 w-full mt-auto pt-6 pb-12 px-6 rounded-t-3xl items-center">
        <Text className="text-gray-500 mb-4">{code || "Enter code"}</Text>

        <View className="flex-row flex-wrap justify-between w-full max-w-xs">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleNumberPress(num)}
              className="w-[30%] bg-white py-4 mb-3 rounded-lg items-center shadow-sm"
            >
              <Text className="text-xl text-gray-800">{num}</Text>
            </TouchableOpacity>
          ))}

          {/* Empty space bottom left */}
          <View className="w-[30%]" />

          <TouchableOpacity
            onPress={() => handleNumberPress("0")}
            className="w-[30%] bg-white py-4 mb-3 rounded-lg items-center shadow-sm"
          >
            <Text className="text-xl text-gray-800">0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="w-[30%] bg-white py-4 mb-3 rounded-lg items-center justify-center shadow-sm"
          >
            <Text className="text-xl text-gray-800">⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
