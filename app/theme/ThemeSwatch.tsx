import React from "react";
import { View } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";

const StyledButton = ({ background, foreground, name }: any) => (
  <Button
    style={{
      backgroundColor: background,
    }}
  >
    <Text style={{ color: foreground }}>{name}</Text>
  </Button>
);

function capitalizeFirstLetter(str: string) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Handle empty strings or non-string inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ThemeSwatch = () => {
  const theme = useTheme();
  const colors = Object.keys(theme.colors).filter((key) => !key.startsWith("on"));

  return (
    <View>
      {colors.map((color) => (
        <StyledButton
          key={color}
          background={theme.colors[color as keyof typeof theme.colors]}
          foreground={theme.colors[`on${capitalizeFirstLetter(color)}` as keyof typeof theme.colors]}
          name={color}
        />
      ))}
    </View>
  );
};

export default ThemeSwatch;
