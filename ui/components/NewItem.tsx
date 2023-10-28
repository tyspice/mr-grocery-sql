import { useState } from "react";
import { Button, Input, Label, ScrollView, TextArea, YStack } from "tamagui";

export const NewItem = () => {
  let [item, setItem] = useState("");
  let [category, setCategory] = useState("");
  let [notes, setNotes] = useState("");

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack width={300} theme="blue">
        <YStack marginBottom={20}>
          <Label htmlFor="item">Item</Label>
          <Input id="item" onChangeText={setItem}></Input>
        </YStack>
        <YStack marginBottom={20}>
          <Label htmlFor="category">Category</Label>
          <Input id="category" onChangeText={setCategory}></Input>
        </YStack>
        <YStack marginBottom={30}>
          <Label htmlFor="notes">Notes</Label>
          <TextArea id="notes" onChangeText={setNotes}></TextArea>
        </YStack>
        <Button>Submit</Button>
      </YStack>
    </ScrollView>
  );
};
