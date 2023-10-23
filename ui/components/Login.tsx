import { useState } from "react";
import { Button, Form, Input, Text, YStack } from "tamagui";
import { useDispatch } from "react-redux";
import { login } from "../features/auth";
import { AppDispatch } from "../store";
import { LogIn } from "@tamagui/lucide-icons";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const submit = (username: string, password: string) => {
    dispatch(login({ username, password }));
  };

  return (
    <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
      <Form onSubmit={() => submit(username, password)}>
        <Input
          padding="$3"
          margin="$3"
          size="$5"
          width={300}
          placeholder="Username"
          theme="blue"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          padding="$3"
          size="$5"
          margin="$3"
          placeholder="Password"
          theme="blue"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          theme="blue"
          margin="$3"
          icon={LogIn}
          size={"$5"}
          textAlign="auto"
          onPress={() => submit(username, password)}
        >
          Login
        </Button>
      </Form>
    </YStack>
  );
};
