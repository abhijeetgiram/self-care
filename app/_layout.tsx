import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "../global.css";

const InitialLayout = () => {
  const { isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isRoot = !segments[0];

    // Push the navigation to the next event loop tick.
    // This gives React the exact microsecond it needs to finish mounting the <Stack />.
    const routingTimeout = setTimeout(() => {
      if (isSignedIn && (inAuthGroup || isRoot)) {
        router.replace("/(tabs)/home");
      } else if (!isSignedIn && !inAuthGroup) {
        router.replace("/(auth)/sign-in");
      }
    }, 1);

    // Clean up the timeout if the component unmounts quickly
    return () => clearTimeout(routingTimeout);
  }, [isSignedIn, segments, navigationState?.key]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
