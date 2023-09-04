import { YStack, ListItem, YGroup, XGroup, Button } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { pushItem, popItem } from "../features/items";

export const Shop = () => {
  const [otherList, setOtherList] = useState(["rats", "football", "turkey"]);
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.items);

  const add = () => {
    const item = otherList[otherList.length - 1];
    if (item) {
      dispatch(pushItem(item));
    }
    setOtherList(otherList.slice(0, -1));
  };

  const remove = () => {
    const item = items[items.length - 1];
    if (item) {
      setOtherList(otherList.concat(item));
    }
    dispatch(popItem());
  };

  return (
    <YStack f={1} jc="space-around" ai="center" backgroundColor={"$background"}>
      <YGroup>
        {items.map((e, i) => (
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
        <XGroup>
          <Button theme="red" onPress={add}>
            add +
          </Button>
          <Button theme="red" onPress={remove}>
            remove -
          </Button>
        </XGroup>
      </YGroup>

      <YGroup>
        {otherList.map((e, i) => (
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
};
