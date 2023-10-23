import {
  YStack,
  ListItem,
  YGroup,
  ScrollView,
  Checkbox,
  Button,
  Sheet,
  Input,
} from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { getShoppingItems, updateItem } from "../features/items";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { Item } from "../models";
import _ from "lodash-es";

export const Shop = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const [innerOpen, setInnerOpen] = useState(false);

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
    <YStack backgroundColor={"$background"} fullscreen={true}>
      <ScrollView backgroundColor={"$background"}>
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
      </ScrollView>
      <Button theme={"blue"} onPress={() => setOpen(true)}>
        <ChevronUp />
      </Button>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={false}
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="bouncy"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame
          padding="$4"
          justifyContent="flex-start"
          alignItems="center"
          theme={"blue"}
          space="$5"
        >
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => setOpen(false)}
          />
          <Input width={200} />
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
};
