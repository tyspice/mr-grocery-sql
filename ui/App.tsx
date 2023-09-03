import { Platform, StyleSheet } from "react-native";
import { createTheme, ThemeProvider, darkColors } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "./Settings";
import Home from "./Home";
import Header from "./Header";
import { navigationRef } from "./RootNavigation";

const theme = createTheme({
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.ios,
      ios: darkColors.platform.ios,
    }),
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ backgroundColor: theme.darkColors?.background }}
        >
          <Header></Header>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
