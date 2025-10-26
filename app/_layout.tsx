import * as React from "react";
import { SafeAreaView } from "react-native";
import { LoginForm } from "./login/LoginForm";
import { Home } from "./Home";
import { PaperProvider } from "react-native-paper";
import { LightTheme, DarkTheme } from "../components/theme";
import { Appearance } from "react-native";

const App = () => {
  const [user, setUser] = React.useState<string | null>(null);
  const colorScheme = Appearance.getColorScheme();

  const theme = {
    ...(colorScheme === "dark" ? DarkTheme : LightTheme),
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView
        style={{ backgroundColor: theme.colors.background, flex: 1 }}
      >
        {user == null ? (
          <LoginForm onLoginSuccess={setUser} />
        ) : (
          <Home user={user} />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
