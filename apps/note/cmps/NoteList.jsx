import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({notes, onChangeInfo}) {
    return (
        <div className="note-list">
        {notes.map(note => (
            <NotePreview 
                key={note.id} 
                note={note}
                onChangeInfo={onChangeInfo}
            />
        ))}
    </div>
    )
}
