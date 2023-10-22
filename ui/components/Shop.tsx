import { YStack, ListItem, YGroup } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getShoppingItems } from "../features/items";
import { Check } from "@tamagui/lucide-icons";

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
              size="$5"
              key={i}
              title={e.item}
              subTitle={e.category}
              iconAfter={<Check size="$2" />}
            >
              {e.notes}
            </ListItem>
          </YGroup.Item>
        ))}
      </YGroup>
    </YStack>
  );
};
