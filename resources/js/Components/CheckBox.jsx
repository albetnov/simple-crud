export default function CheckBox({ onChange, value, id, label }) {
    return (
        <div className="flex items-center gap-3 mt-3">
            <input type="checkbox" onChange={onChange} value={value} name={id} className="p-3 rounded-full border-none bg-slate-200 focus:outline-none focus:ring focus:ring-sky-200" />
            <p>{label}</p>
        </div>
    )
}