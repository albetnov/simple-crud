export default function Modal({ children }) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-lg shadow-md"
        >
            {children}
        </div>
    );
}
