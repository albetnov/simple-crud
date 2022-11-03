import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import Card from '@/Components/Card';
import FormControl from '@/Components/FormControl';
import Button from '@/Components/Button';
import LinkText from '@/Components/LinkText';
import Select from '@/Components/Select';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
    });

    useEffect(() => {
        setData("role", "admin");

        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <Card>
                <h1 className='text-2xl font-semibold my-3'>Register Form</h1>
                <form onSubmit={submit}>
                    <FormControl onChange={onHandleChange} id="name" label="Your Name" type="text" />
                    <FormControl onChange={onHandleChange} id="email" label="Your Email" type='email' />
                    <FormControl onChange={onHandleChange} id="password" label="Your Password" type='password' />
                    <FormControl onChange={onHandleChange} id="password_confirmation" label="Your password confirmation" type="password" />
                    <div className="mb-3">
                        <label htmlFor="role">Register As:</label><br />
                        <Select name="role" onChange={onHandleChange} id="role">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Select>
                    </div>
                    <LinkText label="Already have an account?" linkLabel="Login Now!" routeName="login" />
                    <Button type="submit">Register</Button>
                </form>
            </Card>
        </GuestLayout>
    );
}
