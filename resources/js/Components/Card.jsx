export default function Card({ children, className = "" }) {
    return <div className={`p-7 rounded-lg bg-slate-50 shadow ${className}`}>{children}</div>;
}