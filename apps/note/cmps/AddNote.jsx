import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { ColorPicker } from "./ColorPicker.jsx"

import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function AddNote({ handleChange, onTogglePin, onCloseModal, initialNote = null, isModal = false, onRemove = null, onDuplicate = null, onNoteChange = null }) {
    const [note, setNote] = useState(initialNote || noteService.getEmptyNoteTxt())
    const noteTypeState = initialNote && initialNote.type ? initialNote.type : 'NoteTxt'
    const [noteType, setNoteType] = useState(noteTypeState)
    const isExpandedInitial = initialNote ? true : false
    const [isExpanded, setIsExpanded] = useState(isExpandedInitial)

    const noteRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
                if (isExpanded) {
                    handleSubmit(event)
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isExpanded, note])

    useEffect(() => {
        if (isModal && onNoteChange) {
            onNoteChange(note);
        }
    }, [note, isModal, onNoteChange])

    function handleSubmit(ev) {
        if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
        }
        handleChange(note)

        if (!isModal) {
            resetNote()
            setNoteType('NoteTxt')
            setIsExpanded(false)
        } else if (onCloseModal) {
            onCloseModal()
        }
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
        setNote(prevNote => ({ ...prevNote, style: { ...prevNote.style, backgroundColor: color } }));
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

    function handlePin(e) {
        e.preventDefault()

        if (note.id) {
            onTogglePin(note.id)
        }

        setNote(prevNote => ({ ...prevNote, isPinned: !prevNote.isPinned }))
    }

    function handleClose() {
        if (isModal && onCloseModal) {
            // If in modal mode, call the close modal function
            onCloseModal()
        } else {
            // If not in modal mode, just collapse the note
            setIsExpanded(false)
        }
    }

    // Handle remove note
    function handleRemove() {
        if (note.id && onRemove) {
            onRemove(note.id)
            if (onCloseModal) onCloseModal()
        }
    }

    // Handle duplicate note
    function handleDuplicate() {
        if (note.id && onDuplicate) {
            onDuplicate(note.id)
            if (onCloseModal) onCloseModal()
        }
    }
    return (
        <div className={`add-note-container ${isExpanded ? 'expanded' : ''}`} ref={noteRef}
            style={isExpanded ? { backgroundColor: note.style.backgroundColor, width: isModal ? '100%' : 'auto' } : {}}>

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
                    <button type='button' onClick={handlePin} className='pin-button-add-note' title={note.isPinned ? 'Unpin' : 'Pin to top'}>
                        <img src={note.isPinned ? 'assets/css/imgs/unpin.svg' : 'assets/css/imgs/pin.svg'} alt={note.isPinned ? 'Unpin' : 'Pin Note'} className='pin-icon'></img></button>

                    <section className='add-note'>
                        {noteType === 'NoteTxt' && (<NoteTxt info={note.info} onChangeInfo={onChangeInfo} isExpanded={true} />)}
                        {noteType === 'NoteImg' && (<NoteImg info={note.info} onChangeInfo={onChangeInfo} />)}
                        {noteType === 'NoteVideo' && (<NoteVideo info={note.info} onChangeInfo={onChangeInfo} />)}
                        {noteType === 'NoteTodos' && (<NoteTodos info={note.info} onChangeInfo={onChangeInfo} />)}
                    </section>

                    <section className='add-note-actions'>
                        <ColorPicker onChangeColor={onChangeColor} />
                        {isModal && note.id && (
                            <section className='preview-note-actions'>
                                {onDuplicate && (
                                    <button onClick={handleDuplicate} className='duplicate-btn' title='Copy note'><i className="fa-regular fa-clone"></i></button>)}
                                {onRemove && (
                                    <button onClick={handleRemove} className='close' title='Delete note'><img src='assets/css/imgs/delete.svg' alt="Delete" /></button>)}
                            </section>
                        )}
                        <button type="button" onClick={handleClose} info={note.info} className="close-button">Close</button>
                    </section>

                </form>
            )}
        </div >
    )
}