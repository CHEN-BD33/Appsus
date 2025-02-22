import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({notes, onSelectNote}) {
    return (
        <div className="note-list">
        {notes.map(note => (
            <NotePreview key={note.id} note={note} o onSelectNote={() => onSelectNote(note)} />
        ))}
    </div>
    )
}
