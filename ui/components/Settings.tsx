import { YStack, Button } from "tamagui";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout } from "../features/auth";

export const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
      <Button theme="blue" onPress={() => dispatch(logout())}>
        Logout
      </Button>
    </YStack>
  );
};
