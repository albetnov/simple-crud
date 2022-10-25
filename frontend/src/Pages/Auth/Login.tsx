import { Button } from "@chakra-ui/react";
import Input from "../../Components/Input";
import TextLink from "../../Components/TextLink";
import useAuthBg from "../../Hooks/useAuthBg";
import useLogin from "../../Hooks/useLogin";
import AuthTemplate from "./AuthTemplate";

export default function Login() {
  useAuthBg();
  useLogin();

  const loginHandler = () => {};

  return (
    <AuthTemplate onSubmit={loginHandler}>
      <Input label="Username" type="text" name="username" autoComplete="username" />
      <Input label="Password" type="password" name="password" autoComplete="current-password" />
      <TextLink
        label="Don't have an account?"
        linkLabel="Create One!"
        linkDestination="/auth/register"
      />
      <Button mt={3} colorScheme="whiteAlpha">
        Login
      </Button>
    </AuthTemplate>
  );
}
