export default function FormControl({ type, onChange, value, label, id }) {
    return (
        <div className="mb-3 flex flex-col">
            <label htmlFor={id}>{label}</label>
            <input name={id} type={type} id={id} onChange={onChange} placeholder={`${label}...`} value={value} className='py-2 px-3 mt-1 rounded focus:outline-none focus:ring focus:ring-sky-200 border-none bg-slate-200' />
        </div>
    )
}