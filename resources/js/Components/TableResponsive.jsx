export default function TableResponsive({ children, ...props }) {
    return (
        <div className="overflow-y-auto p-1">
            <table {...props}>{children}</table>
        </div>
    )
}