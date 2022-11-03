export default function Container({ children }) {
    return (
        <div className="container max-w-4xl mt-5 mx-auto">
            {children}
        </div>
    )
}