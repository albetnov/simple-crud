import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../Components/Card";
import Template from "../Components/Template";
import { FiEye, FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { allUser, User } from "../Utilities/api/allUser";
import { userDetail } from "../Utilities/api/userDetail";
import useAlert from "../Hooks/useAlert";
import ButtonLink from "../Components/ButtonLink";
import UserDetailModal from "../Components/UserDetailModal";
import UserDeleteModal from "../Components/UserDeleteModal";

export default function Users() {
  const [users, setUsers] = useState<User[]>();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
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
    onDetailOpen();
  };

  const openDeleteModal = (name: string, id: number) => {
    setCurrentUser({ name, id, roles: "", username: "" });
    onDeleteOpen();
  };

  return (
    <Template>
      <Card>
        <Text fontSize="2xl">Users List</Text>
        {element}
        <ButtonLink to="/users/new" colorScheme="blue" mt={3} leftIcon={<FiPlus />}>
          Create New User
        </ButtonLink>
        <UserDetailModal isOpen={isDetailOpen} onClose={onDetailClose} currentUser={currentUser} />
        <UserDeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} currentUser={currentUser} />
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
                      <ButtonLink to={`/users/edit/${item.id}`} colorScheme="blue" variant="ghost">
                        <FiEdit />
                      </ButtonLink>
                      <Button
                        onClick={() => openDeleteModal(item.name, item.id)}
                        colorScheme="red"
                        variant="ghost"
                      >
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
