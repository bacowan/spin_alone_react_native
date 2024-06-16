import { Stack } from "expo-router";
import {
  MD3DarkTheme as DefaultTheme,
  PaperProvider
} from 'react-native-paper';
import { Appearance } from 'react-native';

let selectedTheme;
if (Appearance.getColorScheme() === "dark") {
  selectedTheme = {
    "colors": {
      "primary": "rgb(255, 181, 160)",
      "onPrimary": "rgb(95, 21, 0)",
      "primaryContainer": "rgb(135, 33, 0)",
      "onPrimaryContainer": "rgb(255, 219, 209)",
      "secondary": "rgb(231, 189, 178)",
      "onSecondary": "rgb(68, 42, 34)",
      "secondaryContainer": "rgb(93, 64, 55)",
      "onSecondaryContainer": "rgb(255, 219, 209)",
      "tertiary": "rgb(216, 197, 141)",
      "onTertiary": "rgb(59, 47, 5)",
      "tertiaryContainer": "rgb(83, 70, 25)",
      "onTertiaryContainer": "rgb(246, 225, 167)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(32, 26, 24)",
      "onBackground": "rgb(237, 224, 221)",
      "surface": "rgb(32, 26, 24)",
      "onSurface": "rgb(237, 224, 221)",
      "surfaceVariant": "rgb(83, 67, 63)",
      "onSurfaceVariant": "rgb(216, 194, 188)",
      "outline": "rgb(160, 140, 135)",
      "outlineVariant": "rgb(83, 67, 63)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(237, 224, 221)",
      "inverseOnSurface": "rgb(54, 47, 45)",
      "inversePrimary": "rgb(176, 47, 0)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(43, 34, 31)",
        "level2": "rgb(50, 38, 35)",
        "level3": "rgb(57, 43, 39)",
        "level4": "rgb(59, 45, 40)",
        "level5": "rgb(63, 48, 43)"
      },
      "surfaceDisabled": "rgba(237, 224, 221, 0.12)",
      "onSurfaceDisabled": "rgba(237, 224, 221, 0.38)",
      "backdrop": "rgba(59, 45, 41, 0.4)"
    }
  };
}
else {
  selectedTheme = {
    "colors": {
      "primary": "rgb(176, 47, 0)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(255, 219, 209)",
      "onPrimaryContainer": "rgb(59, 9, 0)",
      "secondary": "rgb(119, 87, 78)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(255, 219, 209)",
      "onSecondaryContainer": "rgb(44, 21, 15)",
      "tertiary": "rgb(108, 93, 47)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(246, 225, 167)",
      "onTertiaryContainer": "rgb(35, 27, 0)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(32, 26, 24)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(32, 26, 24)",
      "surfaceVariant": "rgb(245, 222, 216)",
      "onSurfaceVariant": "rgb(83, 67, 63)",
      "outline": "rgb(133, 115, 110)",
      "outlineVariant": "rgb(216, 194, 188)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(54, 47, 45)",
      "inverseOnSurface": "rgb(251, 238, 235)",
      "inversePrimary": "rgb(255, 181, 160)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(251, 241, 242)",
        "level2": "rgb(249, 235, 235)",
        "level3": "rgb(246, 229, 227)",
        "level4": "rgb(246, 227, 224)",
        "level5": "rgb(244, 222, 219)"
      },
      "surfaceDisabled": "rgba(32, 26, 24, 0.12)",
      "onSurfaceDisabled": "rgba(32, 26, 24, 0.38)",
      "backdrop": "rgba(59, 45, 41, 0.4)"
    }
  };
}

const theme = {
  ...DefaultTheme,
  colors: selectedTheme.colors, // Copy it from the color codes scheme and then use it here
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
