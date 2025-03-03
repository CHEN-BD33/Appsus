import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { ColorPicker } from "./ColorPicker.jsx"
import { NoteLabels } from "./NoteLabels.jsx"
import { LabelPicker } from "../../../cmps/LabelPicker.jsx"

import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function AddNote({ handleChange, onTogglePin }) {
    const [note, setNote] = useState(noteService.getEmptyNoteTxt())
    const [noteType, setNoteType] = useState('NoteTxt')
    const [isExpanded, setIsExpanded] = useState(false)
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



    function handleSubmit(ev) {
        if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
        }

        handleChange(note)
        resetNote()
        setNoteType('NoteTxt')
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

        setNote(prevNote => ({ ...prevNote, isPinned: !prevNote.isPinned }))
        onTogglePin()
    }

    function onChangeLablels(labels) {
        setNote(prevNote => ({ ...prevNote, labels }))
    }


    return (
        <div className={`add-note-container ${isExpanded ? 'expanded' : ''}`} ref={noteRef}
            style={isExpanded ? { backgroundColor: note.style.backgroundColor } : {}}>
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
                <form onSubmit={handleSubmit} style={{ backgroundColor: note.style.backgroundColor }}>
                    <button type='button' onClick={handlePin} className='pin-button-add-note' title={note.isPinned ? 'Unpin' : 'Pin to top'}>
                        <img src={note.isPinned ? 'assets/css/imgs/unpin.svg' : 'assets/css/imgs/pin.svg'} alt={note.isPinned ? 'Unpin' : 'Pin Note'} className='pin-icon'></img></button>
                    <NoteLabels labels={note.labels || []} />

                    <section className='add-note'>
                        {noteType === 'NoteTxt' && (<NoteTxt info={note.info} onChangeInfo={onChangeInfo} isExpanded={true} />)}
                        {noteType === 'NoteImg' && (<NoteImg info={note.info} onChangeInfo={onChangeInfo} />)}
                        {noteType === 'NoteVideo' && (<NoteVideo info={note.info} onChangeInfo={onChangeInfo} />)}
                        {noteType === 'NoteTodos' && (<NoteTodos info={note.info} onChangeInfo={onChangeInfo} />)}
                    </section>

                    <section className='add-note-actions'>
                        <ColorPicker onChangeColor={onChangeColor} />
                        <LabelPicker selectedLabels={note.labels || []} onChangeLablels={onChangeLablels} />
                        <button type="button" onClick={() => setIsExpanded(false)} info={note.info = ''} className="close-button">Close</button>
                    </section>

                </form>
            )}
        </div >
    )
}