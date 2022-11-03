export default function Tr({ children, onClick }) {
    return <tr className="transition-all delay-200 hover:shadow-lg hover:bg-white hover:cursor-pointer" onClick={onClick}>{children}</tr>
} 