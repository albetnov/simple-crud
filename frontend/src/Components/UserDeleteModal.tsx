import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useAlert from "../Hooks/useAlert";
import { User } from "../Utilities/api/allUser";
import { deleteUser } from "../Utilities/api/deleteUser";

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User;
}

export default function UserDeleteModal({ isOpen, onClose, currentUser }: UserDetailProps) {
  const [element, setAlert] = useAlert();

  const deleteTheUser = async () => {
    const res = await deleteUser(currentUser!.id);
    if (res.code !== 200) {
      setAlert({
        showAlert: true,
        message: `${res.message} ${res.errors?.details}`,
        variant: "error",
      });
      return;
    }
    setAlert({
      showAlert: true,
      variant: "success",
      message: res.json!.message,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete User | {currentUser?.name}</ModalHeader>
        {element}
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete {currentUser?.name} ?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={deleteTheUser}>
            I am!
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
