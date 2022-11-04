import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import FormControl from "@/Components/FormControl";
import Modal from "@/Components/Modal";
import ModalOverlay from "@/Components/ModalOverlay";
import Select from "@/Components/Select";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";

export default function CreateUserModal({ modal, modalHandler, alertMsg }) {
    const [data, setData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setAlert(alertMsg);
    }, [alertMsg]);

    useEffect(() => {
        return () => {
            setData({ password: "", password_confirmation: "" });
        };
    }, []);

    const onChangeHandler = (event) => {
        const field = event.target.name;
        setData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        Inertia.post(route("users.store"), data, {
            onSuccess: () => {
                setAlert("Success adding user");
                setTimeout(() => {
                    setAlert(false);
                    modalHandler(false);
                }, 2000);
            },
            onError: () => {
                setAlert("Failed adding user");
                setTimeout(() => {
                    setAlert(false);
                    modalHandler(false);
                }, 2000);
            },
        });
    };

    return (
        <ModalOverlay ensurance={modal} onClick={modalHandler}>
            <Modal>
                <Alert showIf={alert}>
                    <ul className="list-disc">
                        {Array.isArray(alert)
                            ? alert.map((item, i) => <li key={i}>{item}</li>)
                            : alert}
                    </ul>
                </Alert>
                You're creating a new User, {data.name}
                <hr className="my-5" />
                <form className="mt-5" onSubmit={submitHandler}>
                    <FormControl
                        id="email"
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={onChangeHandler}
                    />
                    <FormControl
                        id="name"
                        label="Name"
                        type="text"
                        value={data.name}
                        onChange={onChangeHandler}
                    />
                    <FormControl
                        id="password"
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={onChangeHandler}
                    />
                    <FormControl
                        id="password_confirmation"
                        label="Password Confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={onChangeHandler}
                    />
                    <div className="mb-3">
                        <label htmlFor="role">Role:</label>
                        <br />
                        <Select
                            name="role"
                            onChange={onChangeHandler}
                            id="role"
                            value={data.role}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Select>
                    </div>
                    <Button type="submit" className="mb-3">
                        Create
                    </Button>
                </form>
                <hr />
                <Button className="mt-5" onClick={() => modalHandler(false)}>
                    Close Modal
                </Button>
            </Modal>
        </ModalOverlay>
    );
}
