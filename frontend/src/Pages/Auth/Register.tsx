import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import Input from "../../Components/Input";
import TextLink from "../../Components/TextLink";
import useAuthBg from "../../Hooks/useAuthBg";
import useLogin from "../../Hooks/useLogin";
import AuthTemplate from "./AuthTemplate";

export default function Register() {
  useLogin();
  useAuthBg();
  const registerHandler = () => {};

  return (
    <AuthTemplate onSubmit={registerHandler}>
      <Input label="Name" type="text" name="name" />
      <Input label="Username" type="text" name="username" autoComplete="username" />
      <Input label="Password" type="password" name="password" autoComplete="current-password" />
      <Input
        label="Confirm Password"
        type="password"
        name="confirm_password"
        autoComplete="current-password"
      />
      <FormControl>
        <FormLabel color="white">Roles</FormLabel>
        <Select placeholder="Roles">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
      </FormControl>
      <TextLink label="Already have an account?" linkLabel="Login." linkDestination="/auth/login" />
      <Button mt={3} colorScheme="whiteAlpha">
        Register
      </Button>
    </AuthTemplate>
  );
}
