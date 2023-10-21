import { YStack, ListItem, YGroup, Button } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getShoppingItems } from "../features/items";

export const Shop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shoppingItems } = useSelector((state: RootState) => state.items);
  useEffect(() => {
    dispatch(getShoppingItems());
  });

  return (
    <YStack f={1} jc="space-around" ai="center" backgroundColor={"$background"}>
      <YGroup>
        {shoppingItems.map((e, i) => (
          <YGroup.Item key={i}>
            <ListItem
              theme={i % 2 === 0 ? "blue" : "blue_alt1"}
              size="$8"
              key={i}
            >
              {e.item}
            </ListItem>
          </YGroup.Item>
        ))}
      </YGroup>
      {/* <Button onPress={() => dispatch(getShoppingItems())}>get</Button> */}
    </YStack>
  );
};
