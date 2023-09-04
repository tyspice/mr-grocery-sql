import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";

import { useFonts } from "expo-font";
import { TamaguiProvider, Theme, YStack, Button } from "tamagui";

import config from "./tamagui.config";

const Stack = createNativeStackNavigator();

const Home = () => (
  <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
    <Button theme="blue">Hello Tyner</Button>
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
