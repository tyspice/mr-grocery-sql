import { YStack, ListItem, YGroup } from "tamagui";

export const Shop = () => (
  <YStack f={1} jc="space-around" ai="center" backgroundColor={"$background"}>
    <YGroup>
      {["carrots", "snails", "smut", "snake"].map((e, i) => (
        <YGroup.Item key={i}>
          <ListItem
            theme={i % 2 === 0 ? "blue" : "blue_alt1"}
            size="$8"
            key={i}
          >
            {e}
          </ListItem>
        </YGroup.Item>
      ))}
    </YGroup>

    <YGroup>
      {["rats", "football", "turkey"].map((e, i) => (
        <YGroup.Item key={i}>
          <ListItem
            theme={i % 2 === 0 ? "green" : "green_alt1"}
            size="$8"
            key={i}
          >
            {e}
          </ListItem>
        </YGroup.Item>
      ))}
    </YGroup>
  </YStack>
);
