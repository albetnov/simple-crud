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
  UnorderedList,
} from "@chakra-ui/react";
import { User } from "../Utilities/api/allUser";

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User;
}

export default function UserDetailModal({ isOpen, onClose, currentUser }: UserDetailProps) {
  return (
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
  );
}
