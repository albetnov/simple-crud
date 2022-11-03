export default function Alert({ showIf, children }) {
    if (!showIf) {
        return <></>
    }

    return <div className="px-7 py-3 rounded-lg bg-sky-300 text-white font-semibold text-lg">{children}</div>
}