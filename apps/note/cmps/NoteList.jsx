import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove, handleChange, onDuplicate, onTogglePin, onSendToMail, onOpenModal }) {
    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)

    return (
        <section className="note-list">
            {/* pinned */}
            {pinnedNotes.length > 0 && (
                <section className='pinned-notes'>
                    <h2 className='pinned-notes-title'>Pinned</h2>
                    <ul className='pinned-notes-list'>
                        {pinnedNotes.map(note => (
                            <li key={note.id}>
                                <NotePreview note={note} handleChange={handleChange} onRemove={onRemove} onDuplicate={onDuplicate} onTogglePin={onTogglePin} onSendToMail={onSendToMail} onOpenModal={onOpenModal} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {/* unpinned */}
            <section className='unpinned-notes'>
                {pinnedNotes.length > 0 && <h2 className='unpinned-notes-title'>Others</h2>}
                <ul className='unpinned-notes-list'>
                    {unpinnedNotes.map(note => (
                        <li key={note.id}>
                            <NotePreview note={note} handleChange={handleChange} onRemove={onRemove} onDuplicate={onDuplicate} onTogglePin={onTogglePin} onSendToMail={onSendToMail} onOpenModal={onOpenModal} />
                        </li>
                    ))}
                </ul>
            </section>

        </section>
    )
}
