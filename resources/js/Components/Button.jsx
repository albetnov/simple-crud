export default function Button({ type, name, className = "", children, onClick }) {
    return <button type={type} name={name} onClick={onClick} className={`${className} py-2 px-4 text-md bg-sky-500 rounded-lg active:outline-none hover:bg-sky-700 active:opacity-80 text-white font-semibold`}>{children}</button>
}