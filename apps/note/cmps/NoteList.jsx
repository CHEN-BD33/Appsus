import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove, onChangeInfo }) {
    return (
        <section className="note-list">
            <ul>
                {notes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} onChangeInfo={onChangeInfo}/>
                        <button onClick={() => onRemove(note.id)} className='close'>Delete</button>
                        <button>Edit</button>
                    </li>
                )}
            </ul>
        </section>
    )
}
