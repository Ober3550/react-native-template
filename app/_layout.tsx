import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { LightTheme, DarkTheme } from "@components/theme";
import { Appearance } from "react-native";
import { SessionProvider, useSession } from '@components/ctx';
import { SplashScreenController } from '@components/splash';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useMemo } from "react";

export default function Root() {
  const colorScheme = Appearance.getColorScheme();

  const theme = {
    ...(colorScheme === "dark" ? DarkTheme : LightTheme),
  };

  return (
    <PaperProvider theme={theme}>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </PaperProvider>
  );
}

// Create a new component that can access the SessionProvider context later.

function RootNavigator() {
  const { session } = useSession();
  
  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}