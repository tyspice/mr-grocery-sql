import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, H4, Input, Label, TextArea, YStack } from "tamagui";
import { AppDispatch } from "../store";
import { addItem, getShoppingItems } from "../features/items";

export const NewItem = (props: { setOpen: (open: boolean) => void }) => {
  let [item, setItem] = useState("");
  let [category, setCategory] = useState("");
  let [notes, setNotes] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const clear = () => {
    setItem("");
    setCategory("");
    setNotes("");
  };

  const submit = async () => {
    await dispatch(
      addItem({ item, category, notes, status: "nonce", inCart: false })
    );
    await dispatch(getShoppingItems());
    clear();
    props.setOpen(false);
  };

  return (
    <YStack width={300} theme="blue">
      <H4 marginBottom={20} alignSelf="center">
        Add a one time item
      </H4>
      <YStack marginBottom={20}>
        <Label htmlFor="item">Item</Label>
        <Input id="item" value={item} onChangeText={setItem}></Input>
      </YStack>
      <YStack marginBottom={20}>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={category}
          onChangeText={setCategory}
        ></Input>
      </YStack>
      <YStack marginBottom={20}>
        <Label htmlFor="notes">Notes</Label>
        <TextArea id="notes" value={notes} onChangeText={setNotes}></TextArea>
      </YStack>
      <Button onPress={submit}>Submit</Button>
    </YStack>
  );
};
