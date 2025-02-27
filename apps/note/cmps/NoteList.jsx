import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove, handleChange, onDuplicate }) {
    return (
        <section className="note-list">
            <ul>
                {notes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} handleChange={handleChange} onRemove={onRemove} onDuplicate={onDuplicate} />
                    </li>
                )}
            </ul>
        </section>
    )
}
