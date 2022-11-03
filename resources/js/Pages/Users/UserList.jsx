import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Card from "@/Components/Card";
import Container from "@/Components/Container";
import CreateUserModal from "@/Components/CreateUserModal";
import Modal from "@/Components/Modal";
import ModalOverlay from "@/Components/ModalOverlay";
import TableResponsive from "@/Components/TableResponsive";
import Td from "@/Components/Td";
import Th from "@/Components/Th";
import Thead from "@/Components/Thead";
import Tr from "@/Components/Tr";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";
import EditUserModal from "../../Components/EditUserModal";

export default function UserList({ users, auth, errors }) {
    const [modalDetail, setModalDetail] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalNew, setModalNew] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: '' });

    const fetchUserDetail = async (id) => {
        const result = await fetch(route('users.show', id), {
            headers: { Accept: "application/json" }
        });

        const response = await result.json();
        setCurrentUser(response);
    }

    const showUserDetail = async (event, id) => {
        await fetchUserDetail(id);

        setModalDetail(true);
    }

    const editButtonHandler = async (event, id) => {
        event.stopPropagation();

        await fetchUserDetail(id);

        setModalEdit(true);
    }

    const newButtonHandler = () => {
        setModalNew(true);
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            overflow={modalDetail || modalEdit}
        >
            <Head title="Users List" />
            <ModalOverlay ensurance={modalDetail} onClick={setModalDetail}>
                <Modal>
                    {currentUser.name}
                    <hr />
                    <ul>
                        <li>Email: {currentUser.email}</li>
                        <li>Role: {currentUser.role}</li>
                    </ul>

                    <button className="py-2 px-4 bg-blue-400 rounded-lg text-white mt-3 hover:bg-blue-600 active:opacity-80" onClick={() => setModalDetail(false)}>Close Modal</button>
                </Modal>
            </ModalOverlay>
            <EditUserModal modal={modalEdit} user={currentUser} modalHandler={setModalEdit} />
            <CreateUserModal modal={modalNew} modalHandler={setModalNew} />
            <Container>
                <Card>
                    <h1 className="text-2xl mt-2 mb-7">Users List</h1>
                    <Button onClick={newButtonHandler}>Create User</Button>
                    <TableResponsive className="w-full">
                        <Thead>
                            <tr>
                                <Th>No</Th>
                                <Th>Name</Th>
                                <Th>Role</Th>
                                <Th>Actions</Th>
                            </tr>
                        </Thead>
                        <tbody>
                            {users.data.map((user, i) => {
                                return (
                                    <Tr key={user.id} onClick={(e) => showUserDetail(e, user.id)}>
                                        <Td>{++i}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.role}</Td>
                                        <Td>
                                            <Button className="mr-3" type="button" onClick={(e) => editButtonHandler(e, user.id)}>Edit</Button>
                                            <ButtonLink href={route('users.destroy', user.id)} method="delete" extends="bg-red-400 hover:bg-red-500 active:opacity-80" type="submit" onClick={e => e.stopPropagation()}>Delete</ButtonLink>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </tbody>
                    </TableResponsive>
                </Card>
            </Container>
        </AuthenticatedLayout >
    )
}