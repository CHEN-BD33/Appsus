import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { ColorPicker } from "./ColorPicker.jsx"


import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function AddNote({ handleChange }) {
    const [note, setNote] = useState(noteService.getEmptyNoteTxt())
    const [noteType, setNoteType] = useState('NoteTxt')
    const [isExpanded, setIsExpanded] = useState(false)
    const noteRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
                if (isExpanded) {
                    handleSubmit(null)
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isExpanded])



    function handleSubmit(ev) {
        if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
        } 

        handleChange(note)
        resetNote()
        setIsExpanded(false)
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

    function onChangeColor(color) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } }
        handleChange(updatedNote)
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

    function expandNote() {
        setIsExpanded(true)
    }

    return (
        <div className={`add-note-container ${isExpanded ? 'expanded' : ''}`} ref={noteRef}>
            {!isExpanded ? (
                // Collapsed state
                <div className="add-note-compact" onClick={expandNote}>
                    <div className="add-note-types">
                        <NoteTxt info={note.info} onChangeInfo={onChangeInfo} isExpanded={false} />
                    </div>
                    <div className="note-more-types">
                        <button type='button' onClick={() => handleTypeChange('NoteTodos')} title='Todos Note'><img src='assets\css\imgs\notetodos.svg'></img></button>
                        <button type='button' onClick={() => handleTypeChange('NoteImg')} title='Image Note'><img src='assets\css\imgs\noteimage.svg'></img></button>
                        <button type='button' onClick={() => handleTypeChange('NoteVideo')} title='Video Note'><i className="fa-brands fa-youtube"></i></button>
                    </div>
                </div>
            ) : (
                //Expand state
                <form onSubmit={handleSubmit}>

                    <section className='add-note'>
                        {noteType === 'NoteTxt' && (<NoteTxt info={note.info} onChangeInfo={onChangeInfo} isExpanded={true} />)}
                        {noteType === 'NoteImg' && (<NoteImg info={note.info} onChangeInfo={onChangeInfo} />)}
                        {noteType === 'NoteVideo' && (<NoteVideo info={note.info} onChangeInfo={onChangeInfo} />)}
                        {noteType === 'NoteTodos' && (<NoteTodos info={note.info} onChangeInfo={onChangeInfo} />)}
                    </section>

                    <div className='note-btn'>
                        <ColorPicker onChangeColor={onChangeColor} />
                    </div>
                    <section className='note-actions'>
                    <button type="submit" className="save-button">Save</button>
                    <button type="button" onClick={() => setIsExpanded(false)} className="close-button">Close</button>
                    </section>

                </form>
            )}
        </div >
    )
}