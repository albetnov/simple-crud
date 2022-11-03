export default function ModalOverlay({ ensurance, onClick, children }) {
    if (!ensurance) return <></>

    return <div className="h-screen w-full relative bg-[rgba(0,0,0,0.4)]" onClick={(event) => {
        event.stopPropagation();
        onClick(false)
    }}>{children}</div>
}