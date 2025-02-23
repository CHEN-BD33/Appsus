import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { noteService } from "../services/note.service.js"

const { useState } = React

export function AddNote({ onHandleChange }) {
    const [note, setNote] = useState(noteService.getEmptyNoteTxt())
    const [noteType, setNoteType] = useState('NoteTxt')

    function handleSubmit(ev) {
        ev.preventDefault()

        onHandleChange(note)
        resetNote()
    }

    function handleTypeChange(type) {
        setNoteType(type)
        switch (type) {
            case 'NoteTxt':
                setNote(noteService.getEmptyNoteTxt())
                break
            case 'NoteImg':
                setNote(noteService.getEmptyNoteImg())
                break
        }
    }

    function onChangeInfo(newInfo) {
        setNote(prevNote => ({ ...prevNote, info: newInfo }))
    }

    function resetNote() {
        const emptyNote = noteType === 'NoteTxt' ? noteService.getEmptyNoteTxt() : noteService.getEmptyNoteImg()
        setNote(emptyNote)
    }

    return (
        <div className='add-note-container'>
            <form onSubmit={handleSubmit}>
                <section className='add-note'>
                    {noteType === 'NoteTxt' && (<NoteTxt info={note.info} onChangeInfo={onChangeInfo} />)}
                    {/* <input type="text" id="txt" name="txt" value={note} onChange={(e) => setNote(e.target.value)} placeholder='Enter text..' /> */}
                    {noteType === 'NoteImg' && (<NoteImg info={note.info} onChangeInfo={onChangeInfo} />)}
                </section>

                <section className='note-actions'>
                    <div className='note-type-btn'>

                        <button type='button' onClick={() => handleTypeChange('NoteTxt')} title='Text Note'>Text</button>
                        <button type='button' onClick={() => handleTypeChange('NoteImg')} title='Image Note'>Image</button>

                    </div>

                    <button type='submit'>Add</button>
                </section>


            </form>
        </div>
    )
}