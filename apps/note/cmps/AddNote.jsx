import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"

import { noteService } from "../services/note.service.js"

const { useState } = React

export function AddNote({ handleChange }) {
    const [note, setNote] = useState(noteService.getEmptyNoteTxt())
    const [noteType, setNoteType] = useState('NoteTxt')

    function handleSubmit(ev) {
        ev.preventDefault()

        handleChange(note)
        resetNote()
    }

    function handleTypeChange(type) {
        setNoteType(type)
        switch (type) {
            case 'NoteTxt':
                setNote(noteService.getEmptyNoteTxt())
                break
            case 'NoteImg':
                setNote(noteService.getEmptyNoteImgVid())
                break
            case 'NoteVideo':
                setNote(noteService.getEmptyNoteImgVid('NoteVideo'))
                break
            case 'NoteTodos':
                setNote(noteService.getEmptyNoteTodos())
                break
        }
    }

    function onChangeInfo(newInfo) {
        setNote(prevNote => ({ ...prevNote, info: newInfo }))
    }

    function resetNote() {
        let emptyNote
        switch (noteType) {
            case 'NoteTxt':
                emptyNote = noteService.getEmptyNoteTxt()
                break
            case 'NoteImg':
                emptyNote = noteService.getEmptyNoteImgVid()
                break
            case 'NoteVideo':
                emptyNote = noteService.getEmptyNoteImgVid('NoteVideo')
                break
            case 'NoteTodos':
                emptyNote = noteService.getEmptyNoteTodos()
                break
        }
        setNote(emptyNote)
    }

    return (
        <div className='add-note-container'>
            <form onSubmit={handleSubmit}>

                <section className='add-note'>
                    {noteType === 'NoteTxt' && (<NoteTxt info={note.info} onChangeInfo={onChangeInfo} />)}
                    {/* <input type="text" id="txt" name="txt" value={note} onChange={(e) => setNote(e.target.value)} placeholder='Enter text..' /> */}
                    {noteType === 'NoteImg' && (<NoteImg info={note.info} onChangeInfo={onChangeInfo} />)}
                    {noteType === 'NoteVideo' && (<NoteVideo info={note.info} onChangeInfo={onChangeInfo} />)}
                    {noteType === 'NoteTodos' && (<NoteTodos info={note.info} onChangeInfo={onChangeInfo} />)}
                </section>

                <section className='note-actions'>
                    <div className='note-type-btn'>
                        <button type='button' onClick={() => handleTypeChange('NoteTxt')} title='Text Note'>Text</button>
                        <button type='button' onClick={() => handleTypeChange('NoteImg')} title='Image Note'>Image</button>
                        <button type='button' onClick={() => handleTypeChange('NoteVideo')} title='Video Note'>Video</button>
                        <button type='button' onClick={() => handleTypeChange('NoteTodos')} title='Todos Note'>Todos</button>
                    </div>
                    <button type='submit'>Add Note</button>
                </section>

            </form>
        </div>
    )
}