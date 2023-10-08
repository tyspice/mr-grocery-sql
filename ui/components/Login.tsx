import { useState } from "react";
import { Button, Form, Input, Text, YStack } from "tamagui";
import { useDispatch } from "react-redux";
import { authenticate } from "../features/auth";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submit = (username: string, password: string) => {
    dispatch(authenticate(true));
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
        <Form.Trigger asChild>
          <Button theme="blue" margin="$3">
            Login
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
};
