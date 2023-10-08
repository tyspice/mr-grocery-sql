import { YStack, Button } from "tamagui";
import { useDispatch } from "react-redux";
import { authenticate } from "../features/auth";

export const Settings = () => {
  const dispatch = useDispatch();

  return (
    <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
      <Button theme="blue" onPress={() => dispatch(authenticate(false))}>
        Logout
      </Button>
    </YStack>
  );
};
