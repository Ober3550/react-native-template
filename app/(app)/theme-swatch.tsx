import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useAppTheme } from "../../components/theme";

const StyledButton = ({ background, foreground, ripple, name }: any) => (
  <Button
    style={{
      backgroundColor: background,
    }}
    rippleColor={ripple}
    onPress={() => {
      console.log(`Clicked ${name}`);
    }}
  >
    <Text style={{ color: foreground }}>{name}</Text>
  </Button>
);

function capitalizeFirstLetter(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Handle empty strings or non-string inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ThemeSwatch = () => {
  const theme = useAppTheme();
  const colors = Object.keys(theme.colors).filter(
    (key) =>
      !key.startsWith("on") &&
      key !== "shadow" &&
      key !== "scrim" &&
      key !== "elevation"
  );

  return (
    <View>
      {colors.map((color) => (
        <StyledButton
          key={color}
          background={theme.colors[color as keyof typeof theme.colors]}
          foreground={
            theme.colors[
              `on${capitalizeFirstLetter(color)}` as keyof typeof theme.colors
            ]
          }
          ripple={theme.colors.ripple}
          name={color}
        />
      ))}
    </View>
  );
};

export default ThemeSwatch;
