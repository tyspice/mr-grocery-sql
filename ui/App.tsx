import { Platform, StyleSheet } from "react-native";
import { createTheme, ThemeProvider, darkColors, Header } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = createTheme({
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.ios,
      ios: darkColors.platform.ios,
    }),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider
        style={{ backgroundColor: theme.darkColors?.background }}
      >
        <Header
          centerComponent={{ text: "Mr Grocery", style: styles.heading }}
        ></Header>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
