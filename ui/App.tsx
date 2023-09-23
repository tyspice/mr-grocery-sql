import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { TamaguiProvider, Theme } from "tamagui";
import config from "./tamagui.config";
import { Provider } from "react-redux";
import { store } from "./store";
import { Navigation } from "./components";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <TamaguiProvider config={config}>
          <Theme name="dark">
            {/* <Login /> */}
            <Navigation />
          </Theme>
        </TamaguiProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
