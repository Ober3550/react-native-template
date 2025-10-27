import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MD3Theme, useTheme } from "react-native-paper";

type Props = {
  user: string;
};

export default function Home({ user }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Welcome {user}!
      </Text>
    </View>
  );
}

const createStyles = (theme: MD3Theme) =>
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
