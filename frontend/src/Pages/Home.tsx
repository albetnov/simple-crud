import { Box, Button, Icon, Text } from "@chakra-ui/react";
import Template from "../Components/Template";
import { FiUser } from "react-icons/fi";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const navToUser = () => {
    return navigate("/users");
  };

  return (
    <Template>
      <Card display="flex" maxW="sm" justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="xl">Users Count</Text>
          <Text mt={5} fontSize="lg">
            10
          </Text>
        </Box>
        <Box p={3} rounded="lg" bg="blue.200">
          <Icon as={FiUser} fontSize="4xl" color="blue.600" />
        </Box>
      </Card>
      <Card mt={10}>
        <Text fontSize="2xl">Welcome to Dashboard, Asep!</Text>
      <Button colorScheme="blue" variant="ghost" mt={8} mb={3} onClick={navToUser}>
          Go To Users Page
        </Button>
      </Card>
    </Template>
  );
}
