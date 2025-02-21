import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

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

    function onChangeInfo(noteId, newInfo) {
        const noteToUpdate = notes.find(note => note.id === noteId)
        if (!noteToUpdate) return

        const updatedNote = {
            ...noteToUpdate,
            info: { ...noteToUpdate.info, ...newInfo }
        }

        noteService.save(updatedNote)
            .then((savedNote) => {
                setNotes(prevNotes => prevNotes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                ))
            })
            .catch(err => console.error('Error saving note:', err))
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className='note-index'>
        <NoteList notes={notes} onChangeInfo={(noteId, info) => onChangeInfo(noteId, info)} />
        </section>

    )
}
