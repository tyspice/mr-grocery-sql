import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigationRef } from "../RootNavigation";
import {
  ShoppingCart,
  ClipboardCheck,
  Settings as SettingsIcon,
} from "@tamagui/lucide-icons";
import { Shop, Audit, Settings } from "../components";

const Tab = createBottomTabNavigator();

export const Navigation = () => (
  <NavigationContainer ref={navigationRef}>
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
        name="Shop"
        component={Shop}
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
  </NavigationContainer>
);
