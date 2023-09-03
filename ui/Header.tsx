import { Button } from "@rneui/themed";
import { Header } from "@rneui/themed";
import { Fragment } from "react";
import { StyleSheet } from "react-native";
import { navigate } from "./RootNavigation";

export default () => (
  <Header
    leftComponent={
      <Fragment>
        <Button onPress={() => navigate("Home")}>one</Button>
        <Button onPress={() => navigate("Settings")}>two</Button>
      </Fragment>
    }
    centerComponent={{ text: "Mr Grocery", style: styles.heading }}
  ></Header>
);

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
