import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove, onHandleNote: onHandleChange }) {
    return (
        <section className="note-list">
            <ul>
                {notes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} onHandleChange={onHandleChange}  />
                        <button onClick={() => onRemove(note.id)} className='close'>Delete</button>
                        {/* <button>Edit</button> */}
                    </li>
                )}
            </ul>
        </section>
    )
}
