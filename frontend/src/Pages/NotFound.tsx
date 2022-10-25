import { Flex, Text } from "@chakra-ui/react";
import DomLink from "../Components/DomLink";

export default function NotFound() {
  return (
    <Flex w="full" h="100vh" flexDirection="column" alignItems="center" justifyContent="center">
      <Text fontSize="5xl" color="gray.600">
        404
      </Text>
      <Text color="gray.800" fontSize="xl">
        Not Found
      </Text>
      <DomLink
        to="/"
        p={3}
        rounded="lg"
        mt={3}
        fontWeight="semibold"
        bg="blue.200"
        color="blue.700"
        _hover={{
          bg: "blue.300",
          color: "blue.800",
        }}
        _active={{
          opacity: 0.8,
        }}
      >
        Go Home
      </DomLink>
    </Flex>
  );
}
