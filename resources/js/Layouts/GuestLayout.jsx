export default function GuestLayout({ children }) {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className="container mx-auto max-w-lg">
                {children}
            </div>
        </div>
    )
}