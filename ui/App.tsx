import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigationRef } from "./RootNavigation";
import {
  ShoppingCart,
  ClipboardCheck,
  Settings as SettingsIcon,
} from "@tamagui/lucide-icons";

import { useFonts } from "expo-font";
import { TamaguiProvider, Theme, YStack, Button, Image } from "tamagui";

import config from "./tamagui.config";

const Tab = createBottomTabNavigator();

const Store = () => (
  <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
    <Button theme="blue">Store</Button>
  </YStack>
);

const Audit = () => (
  <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
    <Button theme="blue">Audit</Button>
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
              <Tab.Screen
                name="Store"
                component={Store}
                options={{
                  tabBarIcon: ({ color }) => (
                    <ShoppingCart color={color}></ShoppingCart>
                  ),
                }}
              ></Tab.Screen>
              <Tab.Screen
                name="Audit"
                component={Audit}
                options={{
                  tabBarIcon: ({ color }) => (
                    <ClipboardCheck color={color}></ClipboardCheck>
                  ),
                }}
              ></Tab.Screen>
              <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                  tabBarIcon: ({ color }) => (
                    <SettingsIcon color={color}></SettingsIcon>
                  ),
                }}
              ></Tab.Screen>
            </Tab.Navigator>
          </Theme>
        </TamaguiProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
