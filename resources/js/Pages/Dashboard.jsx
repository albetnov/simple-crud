import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Card from '@/Components/Card';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <Card className='mt-14 max-w-lg mx-auto'>
                <p>You're logged in as {new String(props.auth.user.role).charAt(0).toUpperCase() + new String(props.auth.user.role).slice(1)}!</p>
            </Card>
        </AuthenticatedLayout>
    );
}
