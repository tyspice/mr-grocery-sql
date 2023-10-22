import { YStack, ListItem, YGroup, ScrollView, Checkbox } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getShoppingItems, updateItem } from "../features/items";
import { Check, ShoppingCart, X } from "@tamagui/lucide-icons";
import { Item } from "../models";
import _ from "lodash-es";

export const Shop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shoppingItems } = useSelector((state: RootState) => state.items);
  useEffect(() => {
    dispatch(getShoppingItems());
  }, []);

  const handleChecked = async (checked: boolean, item: Item) => {
    await dispatch(updateItem(_.merge({}, item, { inCart: checked })));
    await dispatch(getShoppingItems());
  };

  return (
    <ScrollView backgroundColor={"$background"}>
      <YStack
        f={1}
        jc="space-around"
        ai="center"
        backgroundColor={"$background"}
      >
        <YGroup space>
          {shoppingItems.map((e, i) => (
            <YGroup.Item key={i}>
              <ListItem
                theme={i % 2 === 0 ? "blue" : "blue_alt1"}
                size="$5"
                key={i}
                title={e.item}
                subTitle={e.category}
                iconAfter={
                  <Checkbox
                    size="$7"
                    checked={e.inCart}
                    onCheckedChange={(checked) =>
                      handleChecked(checked as boolean, e)
                    }
                  >
                    <Checkbox.Indicator>
                      <Check></Check>
                    </Checkbox.Indicator>
                  </Checkbox>
                }
              >
                {e.notes}
              </ListItem>
            </YGroup.Item>
          ))}
        </YGroup>
      </YStack>
    </ScrollView>
  );
};
