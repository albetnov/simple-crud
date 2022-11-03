import { Link } from "@inertiajs/inertia-react"

export default function AuthenticatedLayout({ auth, errors, overflow, children }) {
    if (Object.keys(errors).length > 0 || auth.user === null) {
        console.log(errors);
        return (
            <div className="flex items-center h-screen w-full justify-center">
                <h1 className="text-4xl font-bold block">Ups... Something went wrong.</h1><br />
                <Link as="button" type="button" href="/" className="block text-white p-3 rounded-lg bg-sky-300 focus:outline-none activate:opacity-80">GO Home</Link>
            </div>
        )
    }

    return (
        <div className={overflow ? "overflow-hidden h-screen" : undefined}>
            <div className="flex items-center p-5 bg-sky-300 font-semibold text-lg text-white justify-between">
                <div className="flex gap-5">
                    <h1 className="text-2xl mr-5">Simple CRUD</h1>
                    <Link href={route('dashboard')}>Home</Link>
                    {auth.user.role === "admin" && <Link href={route('users.index')}>Users</Link>}
                </div>
                <Link as="button" type="submit" method="post" href={route('logout')}>Logout</Link>
            </div>
            {children}
        </div>
    )
}