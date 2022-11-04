import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import TextLink from "../../Components/TextLink";
import useAlert from "../../Hooks/useAlert";
import useAuthBg from "../../Hooks/useAuthBg";
import { registerUser, UserRegistration } from "../../Utilities/api/register";
import AuthTemplate from "./AuthTemplate";

export default function Register() {
  useAuthBg();

  const [element, setAlert] = useAlert(3000);

  const [fields, setFields] = useState<UserRegistration>({
    username: "",
    name: "",
    password: "",
    confirm_password: "",
    roles: "user",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await registerUser(fields);
      console.log(res);
      if (res.code === 422) {
        setAlert({
          showAlert: true,
          message: `${res.message} ${res.errors?.details}`,
          variant: "error",
        });
        return;
      }

      if (res.code === 500) {
        setAlert({
          showAlert: true,
          variant: "error",
          message: res.message!,
        });
        return;
      }

      setAlert({
        showAlert: true,
        message: res.json!.message,
        variant: "success",
      });
      navigate("/auth/login");
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const rolesChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <AuthTemplate onSubmit={registerHandler}>
      {element}
      <Input label="Name" type="text" name="name" onChange={inputChangeHandler} />
      <Input
        label="Username"
        type="text"
        name="username"
        autoComplete="username"
        onChange={inputChangeHandler}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        onChange={inputChangeHandler}
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirm_password"
        autoComplete="current-password"
        onChange={inputChangeHandler}
      />
      <FormControl>
        <FormLabel color="white">Roles</FormLabel>
        <Select placeholder="Roles" name="roles" onChange={rolesChangeHandler}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
      </FormControl>
      <TextLink label="Already have an account?" linkLabel="Login." linkDestination="/auth/login" />
      <Button type="submit" mt={3} colorScheme="whiteAlpha" isLoading={isLoading}>
        Register
      </Button>
    </AuthTemplate>
  );
}
