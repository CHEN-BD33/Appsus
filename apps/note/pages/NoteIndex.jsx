import { AddNote } from '../cmps/AddNote.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect, useRef } = React
const { useSearchParams, useNavigate } = ReactRouterDOM

export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    const [selectedNote, setSelectedNote] = useState(null)
    const [editedNote, setEditedNote] = useState(null)
    const dialogRef = useRef(null)

    function openNoteModal(note) {
        setSelectedNote(note)
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    function closeNoteModal(updatedNote = null) {
        if (dialogRef.current && dialogRef.current.open) {
            if (updatedNote) {
                handleChange(updatedNote)
            }
            dialogRef.current.close()
            setSelectedNote(null)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => console.log('Error loading notes:', err))
    }

    function handleChange(noteToSave) {
        noteService.save(noteToSave)
            .then(savedNote => {
                setNotes(prevNotes => {

                    if (noteToSave.id) {
                        const noteIndex = prevNotes.findIndex(note => note.id === noteToSave.id)
                        const updatedNotes = [...prevNotes]
                        updatedNotes[noteIndex] = savedNote
                        return updatedNotes
                    }
                    return [savedNote, ...prevNotes]

                })
                showSuccessMsg('Note saved successfully!')
            })
            .catch(err => {
                console.error('Failed to save note:', err)
                showErrorMsg('Failed to save note')
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

    function togglePin(noteId) {
        const note = notes.find(note => note.id === noteId)
        if (!note) return

        const updatedNote = { ...note, isPinned: !note.isPinned }

        noteService.save(updatedNote)
            .then(savedNote => {
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
                showSuccessMsg(savedNote.isPinned ? 'Note Pinned!' : 'Note Unpinned')
            })
            .catch(err => {
                console.error('Faild to update pin status', err)
                showErrorMsg('Faild to update pin status')
            })
    }

    function duplicateNote(noteId) {
        noteService.duplicate(noteId)
            .then(duplicateNote => {
                setNotes(prevNotes => [duplicateNote, ...prevNotes])
                showSuccessMsg('Note duplicated successfully!')
            })
            .catch(err => {
                console.error('Failed to duplicate note:', err)
                showErrorMsg('Failed to duplicate note')
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function sendToEmail(note) {
        const { subject, body } = noteService.getEmailParamsFromNote(note)

        navigate(`/mail/edit?fromNotes=true&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)

    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className='note-index'>

            <NoteFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />
            <AddNote handleChange={handleChange} onTogglePin={togglePin} />
            <NoteList notes={notes} onRemove={removeNote} handleChange={handleChange} onDuplicate={duplicateNote} onTogglePin={togglePin} onSendToMail={sendToEmail} onOpenModal={openNoteModal} />

            <dialog ref={dialogRef} onClick={(e) => {
                if (e.target === dialogRef.current) {
                    closeNoteModal(editedNote || selectedNote)
                }
            }}
                className="note-modal"
                style={{
                    backgroundColor: selectedNote && selectedNote.style ? selectedNote.style.backgroundColor || 'white' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: 0,
                    maxWidth: '600px',
                    width: '90%'
                }}>
                {selectedNote && (
                    <AddNote initialNote={selectedNote} handleChange={handleChange} onTogglePin={togglePin} onCloseModal={closeNoteModal} onRemove={removeNote} onDuplicate={duplicateNote} onNoteEdit={setEditedNote} isModal={true} />
                )}
            </dialog>
        </section>

    )
}
