import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Card from "../Components/Card";
import Template from "../Components/Template";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

export default function Users() {
  return (
    <Template>
      <Card>
        <Text fontSize="2xl">Users List</Text>
        <TableContainer mx="auto" my={10} maxW="container.lg">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Roles</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Hello</Td>
                <Td>hello</Td>
                <Td>user</Td>
                <Td textAlign="center">
                  <Button colorScheme="cyan" variant="ghost">
                    <FiEye />
                  </Button>
                  <Button colorScheme="blue" variant="ghost">
                    <FiEdit />
                  </Button>
                  <Button colorScheme="red" variant="ghost">
                    <FiTrash />
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Template>
  );
}
