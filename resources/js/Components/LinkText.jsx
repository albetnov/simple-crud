import { Link } from "@inertiajs/inertia-react";

export default function LinkText({label, routeName, linkLabel}) {
    return (
        <p className='mt-7 mb-3'>{label} <Link href={route(routeName)} className='text-cyan-600 hover:underline'>{linkLabel}</Link></p>
    )
}