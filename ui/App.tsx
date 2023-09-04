import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Paragraph, TamaguiProvider, Theme, YStack } from "tamagui";

import config from "./tamagui.config";

const Stack = createNativeStackNavigator();

const Home = () => (
  <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
    <Paragraph jc="center">Hello</Paragraph>
    <StatusBar />
  </YStack>
);

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <TamaguiProvider config={config}>
          <Theme name="dark">
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#000",
                },
                headerTintColor: "#fff",
              }}
            >
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
            </Stack.Navigator>
          </Theme>
        </TamaguiProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
