import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiArrowLeft, FiEdit, FiUserPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import ButtonLink from "../Components/ButtonLink";
import Card from "../Components/Card";
import Template from "../Components/Template";
import useAlert from "../Hooks/useAlert";
import { User } from "../Utilities/api/allUser";
import { createUser, CreateUser } from "../Utilities/api/createUser";
import { editUser, EditUserRequest } from "../Utilities/api/editUser";
import { userDetail } from "../Utilities/api/userDetail";

export default function UserForm() {
  const params = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      if (params.id) {
        const res = await userDetail(parseInt(params.id));
        console.log(res);

        if (!res) {
          return navigate("/notfound");
        }

        setUser(res.data as User);
      }
    };

    fetchDetail();
  }, [params.id]);

  const initialFields = {
    username: "",
    roles: "user",
    confirm_password: "",
    name: "",
    password: "",
  };

  let text = isEdit ? "Edit" : "Create";
  let actionIcon = isEdit ? <FiEdit /> : <FiUserPlus />;

  const [fields, setFields] = useState<CreateUser>(initialFields);

  useEffect(() => {
    if (user) {
      setIsEdit(true);
      setFields({
        username: user.username,
        roles: user.roles,
        name: user.name,
        password: "",
        confirm_password: "",
      });
      text = isEdit ? "Edit" : "Create";
      actionIcon = isEdit ? <FiEdit /> : <FiUserPlus />;
    }
  }, [user]);

  const [element, setAlert] = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const roleChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFields((prev) => ({ ...prev, roles: event.target.value }));
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      let res;

      if (isEdit) {
        let finalFields: EditUserRequest = {
          ...fields,
        };
        if (fields.password === "" || fields.confirm_password === "") {
          finalFields = { name: fields.name, username: fields.username, roles: fields.roles };
        }
        res = await editUser(finalFields, user!.id);
      } else {
        res = await createUser(fields);
      }

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
        variant: "success",
        message: res.json!.message,
      });
      setFields(initialFields);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Template>
      <Card>
        <Text fontSize="2xl">{text} User</Text>
        {element}
        <form onSubmit={submitHandler}>
          <SimpleGrid gridTemplateColumns={{ base: "1fr", md: "1fr, 1fr" }} gap={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={inputChangeHandler} name="name" value={fields.name} />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                onChange={inputChangeHandler}
                value={fields.username}
              />
            </FormControl>
            {isEdit && (
              <Alert status="info">
                <AlertIcon />
                Leave empty if you don't want to change password.
              </Alert>
            )}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={inputChangeHandler}
                value={fields.password}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password Confirmation</FormLabel>
              <Input
                type="password"
                name="confirm_password"
                onChange={inputChangeHandler}
                value={fields.confirm_password}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Roles</FormLabel>
              <Select onChange={roleChangeHandler} value={fields.roles}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </FormControl>
          </SimpleGrid>
          <Button
            mt={3}
            type="submit"
            isLoading={isLoading}
            colorScheme="blue"
            leftIcon={actionIcon}
          >
            {text} User
          </Button>
          <ButtonLink
            disabled={isLoading}
            to="/users"
            mt={3}
            ml={2}
            colorScheme="cyan"
            leftIcon={<FiArrowLeft />}
            color="white"
          >
            Back
          </ButtonLink>
        </form>
      </Card>
    </Template>
  );
}
