import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigationRef } from "./RootNavigation";

import { useFonts } from "expo-font";
import { TamaguiProvider, Theme, YStack, Button, Image } from "tamagui";

import config from "./tamagui.config";

const Tab = createBottomTabNavigator();

const Home = () => (
  <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
    <Button theme="blue">Home</Button>
  </YStack>
);

const Settings = () => (
  <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
    <Button theme="blue">Settings</Button>
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
            <Tab.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#000",
                },
                tabBarStyle: {
                  backgroundColor: "#000",
                },
                headerTintColor: "#fff",
              }}
            >
              <Tab.Screen name="Home" component={Home}></Tab.Screen>
              <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
            </Tab.Navigator>
          </Theme>
        </TamaguiProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
