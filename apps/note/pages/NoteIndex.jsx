import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => console.log('Error loading notes:', err))
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className='note-index'>
            <div className='notes-grid'>
                {notes.map(note => (
                    <NotePreview key={note.id} note={note} />
                ))}
            </div>
        </section>

    )
}
