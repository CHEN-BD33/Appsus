
export function NotePreview({ note }) {

    return (
        <div className='note-preview' style={{ backgroundColor: note.style.backgroundColor }}>
            <div className="note-content">
                {note.info.txt}
            </div>
        </div>
    )
}
