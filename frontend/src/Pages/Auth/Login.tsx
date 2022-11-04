import { Button } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import TextLink from "../../Components/TextLink";
import useAlert from "../../Hooks/useAlert";
import useAuthBg from "../../Hooks/useAuthBg";
import { AuthAction } from "../../Store/AuthSlice";
import { loginUser, UserLogin } from "../../Utilities/api/login";
import AuthTemplate from "./AuthTemplate";

export default function Login() {
  useAuthBg();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [element, setAlert] = useAlert();

  const [fields, setFields] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await loginUser(fields);
      console.log(res);

      if (res.code === 422) {
        setAlert({
          showAlert: true,
          variant: "error",
          message: `${res.message} ${res.errors?.details}`,
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
        variant: "success",
        message: res.json!.message,
      });
      dispatch(AuthAction.login({ token: res.json!.token, time: res.json!.expiresIn.toString() }));
      navigate("/");
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate onSubmit={loginHandler}>
      {element}
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
      <TextLink
        label="Don't have an account?"
        linkLabel="Create One!"
        linkDestination="/auth/register"
      />
      <Button mt={3} colorScheme="whiteAlpha" type="submit" isLoading={isLoading}>
        Login
      </Button>
    </AuthTemplate>
  );
}
