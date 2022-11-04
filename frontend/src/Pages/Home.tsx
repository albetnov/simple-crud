import { Box, Button, Icon, Text } from "@chakra-ui/react";
import Template from "../Components/Template";
import { FiUser } from "react-icons/fi";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../Store/Auth";
import { useEffect, useState } from "react";
import { userCount } from "../Utilities/api/userCount";
import useLogin from "../Hooks/useLogin";

export default function Home() {
  useLogin();
  const user = useSelector((state: StoreState) => state.user);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const navToUser = () => {
    return navigate("/users");
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      const res = await userCount();
      if (!res) return;
      setCount(res.data);
    };
    fetchUserCount();
  }, []);

  return (
    <Template>
      <Card display="flex" maxW="sm" justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="xl">Users Count</Text>
          <Text mt={5} fontSize="lg">
            {count}
          </Text>
        </Box>
        <Box p={3} rounded="lg" bg="blue.200">
          <Icon as={FiUser} fontSize="4xl" color="blue.600" />
        </Box>
      </Card>
      <Card mt={10}>
        <Text fontSize="2xl">Welcome to Dashboard, {user ? user.name : "Guest"}!</Text>
        <Button colorScheme="blue" variant="ghost" mt={8} mb={3} onClick={navToUser}>
          Go To Users Page
        </Button>
      </Card>
    </Template>
  );
}
