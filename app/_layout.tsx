import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext"; // Import our new provider and hook
import "../global.css";

const InitialLayout = () => {
  const { isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // This effect listens to auth state and redirects accordingly
  useEffect(() => {
    const timer = setTimeout(() => {
      const inTabsGroup = segments[0] === "(tabs)";
      const inAuthGroup = segments[0] === "(auth)";

      if (isSignedIn && !inTabsGroup) {
        router.replace("/(tabs)/home");
      } else if (!isSignedIn && !inAuthGroup) {
        router.replace("/(auth)/sign-in");
      }
    }, 800); // 800ms artificial delay for the splash screen

    return () => clearTimeout(timer);
  }, [isSignedIn, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    // Wrap the app in our cleanly extracted AuthProvider
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
