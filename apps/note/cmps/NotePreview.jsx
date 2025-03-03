import { NoteTxt } from "../cmps/NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { ColorPicker } from "./ColorPicker.jsx"
import { NoteLabels } from "./NoteLabels.jsx"
import { LabelPicker } from "../../../cmps/LabelPicker.jsx"


export function NotePreview({ note, onRemove, handleChange, onDuplicate, onTogglePin, onSendToMail }) {

    function onChangeInfo(updatedInfo) {
        const updatedNote = { ...note, info: updatedInfo }
        handleChange(updatedNote)
    }

    function onChangeColor(color) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } }
        handleChange(updatedNote)
    }

    function onChangeLabels(labels) {
        const updatedNote = { ...note, labels }
        handleChange(updatedNote)

    }


    const backgroundColor = note.style ? note.style.backgroundColor : '#fff'

    return (
        <section className='note-preview' style={{ backgroundColor }}>
            <button onClick={() => onTogglePin(note.id)} className={`pin-button ${note.isPinned ? 'pinned' : ''}`} title={note.isPinned ? 'Unpin' : 'Pin to top'}>
                <img src={note.isPinned ? 'assets/css/imgs/unpin.svg' : 'assets/css/imgs/pin.svg'} alt={note.isPinned ? 'Unpin' : 'Pin Note'} className='pin-icon'></img></button>
            <DynamicCmp type={note.type} info={note.info} onChangeInfo={onChangeInfo} isPreview={true} />
            <NoteLabels labels={note.labels || []} />

            <section className='preview-note-actions'>
                <ColorPicker backgroundColor={backgroundColor} onChangeColor={onChangeColor} />
                <LabelPicker selectedLabels={note.labels || []} onChangeLabels={onChangeLabels} />
                <button onClick={() => onSendToMail(note)} className='send-to-mail-btn' title='Send Note As Mail'><i className="fa-regular fa-envelope"></i></button>
                <button onClick={() => onDuplicate(note.id)} className='duplicate-btn' title='Copy note'><i className="fa-regular fa-clone"></i></button>
                <button onClick={() => onRemove(note.id)} className='delete-btn' title='Delete note'><img src='assets\css\imgs\delete.svg'></img></button>
            </section>
        </section>
    )
}

function DynamicCmp({ type, info, onChangeInfo, isPreview }) {
    switch (type) {
        case 'NoteTxt':
            return <NoteTxt info={info} onChangeInfo={onChangeInfo} isPreview={isPreview} />
        case 'NoteImg':
            return <NoteImg info={info} onChangeInfo={onChangeInfo} />
        case 'NoteVideo':
            return <NoteVideo info={info} onChangeInfo={onChangeInfo} />
        case 'NoteTodos':
            return <NoteTodos info={info} onChangeInfo={onChangeInfo} />
        default:
            return <div>Unsupported note type</div>
    }
}