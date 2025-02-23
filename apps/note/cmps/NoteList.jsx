import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove, onHandleNoteUpdate }) {
    return (
        <section className="note-list">
            <ul>
                {notes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} onHandleNoteUpdate={onHandleNoteUpdate}  />
                        <button onClick={() => onRemove(note.id)} className='close'>Delete</button>
                        {/* <button>Edit</button> */}
                    </li>
                )}
            </ul>
        </section>
    )
}
