import { View } from "react-native";
import { Stack, Link } from 'expo-router';
import { Button, useTheme } from 'react-native-paper';

export default function Index() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        rowGap: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background
      }}>
      <Stack.Screen
        options={{
          title: "Spin Alone"
        }}/>
      <Link href="./play" asChild>
        <Button onPress={() => {}}
          mode="contained-tonal"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}>
              Start
          </Button>
      </Link>
      <Button onPress={() => {}}
        mode="contained-tonal"
        buttonColor={theme.colors.secondary}
        textColor={theme.colors.onSecondary}>
            Edit
        </Button>
    </View>
  );
}