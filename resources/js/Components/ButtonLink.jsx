import { Link } from "@inertiajs/inertia-react";

export default function ButtonLink(props) {
    const extend = props.extends || "bg-blue-400";

    return <Link as="button" className={`py-2 px-4 rounded-lg text-white ${extend}`} {...props} />
}