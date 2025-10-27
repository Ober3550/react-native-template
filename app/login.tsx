import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { Button } from "react-native-paper";
import { AppTheme, useAppTheme } from "@components/theme";
import { router } from "expo-router";
import { useSession } from "@components/ctx";

type Props = {
  onLoginSuccess: (user: string) => void;
};

export default function Login() {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);
  const { signIn } = useSession();

  const handleSignIn = async () => {
    setIsLoading(true);

    const user = await authUser(username, password);
    setIsLoading(false);

    if (user) {
      setError(undefined);
      signIn(user);
      router.replace('/home');
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Sign in to Example App
      </Text>

      <Text style={styles.textLabel}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        accessibilityLabel="Username"
        autoCapitalize="none"
        style={styles.textInput}
      />

      <Text style={styles.textLabel}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />

      {error && (
        <Text accessibilityRole="alert" style={styles.validator}>
          {error}
        </Text>
      )}

      <Button mode="contained" onPress={handleSignIn}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </Button>
    </View>
  );
}

/**
 * Fake authentication function according to our abilities.
 * @param username The username to authenticate.
 * @param password The password to authenticate.
 * @returns username if the username and password are correct, null otherwise.
 */
function authUser(username: string, password: string): Promise<string | null> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const hasValidCredentials = username === "admin" && password === "admin1";
      resolve(hasValidCredentials ? username : null);
    }, 250)
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignSelf: "center",
      padding: 20,
      width: 400,
    },
    title: {
      color: theme.colors.onBackground,
      alignSelf: "center",
      fontSize: 24,
      marginTop: 8,
      marginBottom: 40,
    },
    textLabel: {
      color: theme.colors.onBackground,
      fontSize: 16,
    },
    textInput: {
      color: theme.colors.onBackground,
      fontSize: 20,
      marginVertical: 8,
      borderColor: theme.colors.primaryContainer,
      borderWidth: 1,
    },
    button: {
      backgroundColor: theme.colors.primaryContainer,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      minHeight: 56,
    },
    buttonText: {
      padding: 8,
      fontSize: 20,
      fontWeight: "600",
      color: theme.colors.onPrimaryContainer,
    },
    validator: {
      color: theme.colors.onPrimaryContainer,
      fontSize: 18,
      padding: 8,
    },
  });
