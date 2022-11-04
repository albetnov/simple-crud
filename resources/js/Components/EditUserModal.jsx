import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import FormControl from "@/Components/FormControl";
import Modal from "@/Components/Modal";
import ModalOverlay from "@/Components/ModalOverlay";
import Select from "@/Components/Select";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";

export default function EditUserModal({ user, modal, modalHandler, alertMsg }) {
    const [pwChange, setPwChange] = useState(false);

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const [password, setPassword] = useState({
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            setPassword({ password: "", password_confirmation: "" });
        };
    }, []);

    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setAlert(alertMsg);
    }, [alertMsg]);

    useEffect(() => {
        setData({ name: user.name, email: user.email, role: user.role });
    }, [user]);

    const onPassChangeHandler = (event) => {
        const field = event.target.name;
        setPassword((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const onChangeHandler = (event) => {
        const field = event.target.name;
        setData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        Inertia.put(route("users.update", user.id), data, {
            onSuccess: () => {
                setAlert("Success editing user");
                setTimeout(() => {
                    setAlert(false);
                    modalHandler(false);
                }, 2000);
            },
            onError: () => {
                setAlert("Failed editing user");
                setTimeout(() => {
                    setAlert(false);
                    modalHandler(false);
                }, 2000);
            },
        });
    };

    const passwordSubmitHandler = (event) => {
        event.preventDefault();

        Inertia.put(route("users.password", user.id), password, {
            onSuccess: () => {
                setAlert("Success editing user password");
                setTimeout(() => {
                    setAlert(false);
                    modalHandler(false);
                }, 2000);
            },
            onError: () => {
                setAlert("Failed editing user password");
                setTimeout(() => {
                    setAlert(false);
                    modalHandler(false);
                }, 2000);
            },
        });
    };

    const userChangeForm = (
        <>
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
        </>
    );

    const pwChangeForm = (
        <>
            <FormControl
                id="password"
                label="Password"
                type="password"
                value={password.password}
                onChange={onPassChangeHandler}
            />
            <FormControl
                id="password_confirmation"
                label="Password Confirmation"
                type="password"
                value={password.password_confirmation}
                onChange={onPassChangeHandler}
            />
        </>
    );

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
                You're editing {user.name}{" "}
                {pwChange && "| Password Change Scope"}
                <hr className="my-5" />
                <form
                    className="mt-5"
                    onSubmit={pwChange ? passwordSubmitHandler : submitHandler}
                >
                    {pwChange ? pwChangeForm : userChangeForm}

                    <Button type="submit" className="mb-3">
                        Edit {pwChange && "Password"}
                    </Button>
                    <Button
                        className="bg-yellow-400 ml-3 hover:bg-yellow-500"
                        type="button"
                        onClick={() => setPwChange((prev) => !prev)}
                    >
                        {!pwChange
                            ? "Change Password?"
                            : "Back to Change Account"}
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
