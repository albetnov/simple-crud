import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../Components/Card";
import Template from "../Components/Template";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import { allUser, User } from "../Utilities/api/allUser";
import { userDetail } from "../Utilities/api/userDetail";
import useAlert from "../Hooks/useAlert";

export default function Users() {
  const [users, setUsers] = useState<User[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<User>();
  const [element, setAlert] = useAlert();

  useEffect(() => {
    const fetchUserList = async () => {
      const res = await allUser();
      if (!res) return;
      setUsers(res.data);
    };

    fetchUserList();
  }, []);

  const openViewModal = async (id: number) => {
    const res = await userDetail(id);
    if (!res) {
      setAlert({
        message: "Something went wrong when opening detail.",
        variant: "error",
        showAlert: true,
      });
      return;
    }

    setCurrentUser(res.data);
    onOpen();
  };

  return (
    <Template>
      <Card>
        <Text fontSize="2xl">Users List</Text>
        {element}
        <Button colorScheme="blue" mt={3}>
          Create New User
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Detail | {currentUser?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UnorderedList>
                <ListItem>Name: {currentUser?.name}</ListItem>
                <ListItem>Username: {currentUser?.username}</ListItem>
                <ListItem>Role: {currentUser?.roles}</ListItem>
              </UnorderedList>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
              {users?.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.username}</Td>
                    <Td>{item.roles}</Td>
                    <Td textAlign="center">
                      <Button
                        colorScheme="cyan"
                        variant="ghost"
                        onClick={() => openViewModal(item.id)}
                      >
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
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Template>
  );
}
