import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { AppTheme, useAppTheme } from "@components/theme";
import { useSession } from "@components/ctx";
import { useRouter } from "expo-router";

export default function Home() {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { session, signOut } = useSession();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button onPress={() => router.push('/theme-swatch')}>Theme Swatch</Button>
      <Button onPress={() => router.push('/upload')}>Upload File</Button>
      <Text accessibilityRole="header" style={styles.title}>
        Welcome {session}!
      </Text>
      <Button onPress={() => signOut()}>Logout</Button>
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    title: {
      alignSelf: "center",
      fontSize: 24,
      marginTop: 8,
      marginBottom: 40,
    },
  });
