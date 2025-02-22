import { AddNote } from '../cmps/AddNote.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => console.log('Error loading notes:', err))
    }

    function onAddNote(noteToAdd) {
        noteService.save(noteToAdd)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                showSuccessMsg('Note saved successfully!')
            })
    }

    function onChangeInfo(noteToEdit) {
        noteService.save(noteToEdit)
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === savedNote.id ? savedNote : note
                    )
                )
                showSuccessMsg('Note updated successfully!')
            })
    }
    
    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => noteId !== note.id))
                showSuccessMsg('Note has been successfully removed!')
            })
            .catch(() => {
                console.log('error remove note:', err)
                showErrorMsg(`couldn't remove Note`)
            })
    }
    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }


    if (!notes) return <div>Loading...</div>

    return (
        <section className='note-index'>
            <h2>My Notes</h2>
            <AddNote onAddNote={onAddNote} />
            <NoteFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />
            <NoteList notes={notes} onRemove={removeNote} onChangeInfo={onChangeInfo} />

        </section>

    )
}
