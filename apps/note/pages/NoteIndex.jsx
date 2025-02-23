import { AddNote } from '../cmps/AddNote.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
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
            .catch(err => console.log('Error loading notes:', err))
        showErrorMsg('Failed to add note')
    }

    function handleNoteUpdate(noteToUpdate) {
        noteService.save(noteToUpdate)
            .then(() => {
                setNotes((prevNotes) => {
                    const updatedNotes = [...prevNotes]
                    const noteIndex = updatedNotes.findIndex(note => note.id === noteToUpdate.id)
                    updatedNotes[noteIndex] = noteToUpdate
                    return updatedNotes
                })
                // showSuccessMsg('Note updated successfully!')
            })
            .catch(err => {
                console.error('Failed to update note:', err)
                showErrorMsg('Failed to update note')
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
            <NoteList notes={notes} onRemove={removeNote} onHandleNoteUpdate={handleNoteUpdate} />

        </section>

    )
}
