import { Link } from "@inertiajs/inertia-react";

export default function AuthenticatedLayout({ auth, overflow, children }) {
    return (
        <div className={overflow ? "overflow-hidden h-screen" : undefined}>
            <div className="flex items-center p-5 bg-sky-300 font-semibold text-lg text-white justify-between">
                <div className="flex gap-5">
                    <h1 className="text-2xl mr-5">Simple CRUD</h1>
                    <Link href={route("dashboard")}>Home</Link>
                    {auth.user.role === "admin" && (
                        <Link href={route("users.index")}>Users</Link>
                    )}
                </div>
                <Link
                    as="button"
                    type="submit"
                    method="post"
                    href={route("logout")}
                >
                    Logout
                </Link>
            </div>
            {children}
        </div>
    );
}
