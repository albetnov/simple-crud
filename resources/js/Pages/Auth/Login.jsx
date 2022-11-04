import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import GuestLayout from "@/Layouts/GuestLayout";
import FormControl from "@/Components/FormControl";
import CheckBox from "@/Components/CheckBox";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import LinkText from "@/Components/LinkText";
import Alert from "@/Components/Alert";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const data = [];

            for (const item in errors) {
                data.push(errors[item]);
            }

            setAlert(data);
        }
    }, [errors]);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Simple CRUD" />
            <Card>
                <h1 className="text-2xl font-semibold my-3">Login Form</h1>
                <Alert showIf={alert}>
                    Something Went Wrong:
                    <ul className="list-disc">
                        {Array.isArray(alert) &&
                            alert.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </Alert>
                <form onSubmit={submit}>
                    <FormControl
                        onChange={onHandleChange}
                        label="Your email"
                        type="email"
                        id="email"
                    />
                    <FormControl
                        onChange={onHandleChange}
                        label="Your password"
                        type="password"
                        id="password"
                    />
                    <CheckBox
                        onChange={onHandleChange}
                        id="remember"
                        label="Remember Me?"
                    />
                    <LinkText
                        label="Don't have an account?"
                        linkLabel="Register Now!"
                        routeName="register"
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Card>
        </GuestLayout>
    );
}
