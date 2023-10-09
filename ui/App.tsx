import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { TamaguiProvider, Theme } from "tamagui";
import config from "./tamagui.config";
import { Provider } from "react-redux";
import { store } from "./store";
import { Navigation, Login } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./store";

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
            <Body />
          </Theme>
        </TamaguiProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

function Body() {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? <Navigation /> : <Login />;
}
