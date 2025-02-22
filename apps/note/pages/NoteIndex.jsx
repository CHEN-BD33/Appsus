import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

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

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => noteId !== note.id))
                showSuccessMsg('Note has been successfully removed!')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove Note`)
                navigate('/note')
            })
    }

    function onChangeInfo(noteToEdit) {
        noteService.save(noteToEdit)
            .then(() => {
                loadNotes()
                setSelectedNote(null)
                showSuccessMsg('Note saved successfully!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error saving note')
            })
    }


    if (!notes) return <div>Loading...</div>

    return (
        <section className='note-index'>
            <h2>My Notes</h2>
            <div className="add-note">
               <button>Add New Note</button>
            </div>
            <NoteFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />
             <NoteList notes={notes} onRemove={removeNote}  onChangeInfo={onChangeInfo} />
            
        </section>

    )
}
