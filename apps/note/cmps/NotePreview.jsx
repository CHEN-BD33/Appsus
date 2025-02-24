import { NoteTxt } from "../cmps/NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { ColorPicker } from "./ColorPicker.jsx"


export function NotePreview({ note, onHandleChange }) {

    function onChangeInfo(updatedInfo) {
        const updatedNote = { ...note, info: updatedInfo }
        onHandleChange(updatedNote)
    }

    function onChangeColor(color) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } }
        onHandleChange(updatedNote)
    }

    const backgroundColor = note.style ? note.style.backgroundColor : 'white'

    return (
        <section className='note-preview' style={{ backgroundColor }}>
            <section className='note-actions'>
                <ColorPicker backgroundColor={backgroundColor} onChangeColor={onChangeColor} />
            </section>
            <DynamicCmp type={note.type} info={note.info} onChangeInfo={onChangeInfo} />
        </section>
    )
}

function DynamicCmp({ type, info, onChangeInfo }) {
    switch (type) {
        case 'NoteTxt':
            return <NoteTxt info={info} onChangeInfo={onChangeInfo} />
        case 'NoteImg':
            return <NoteImg info={info} onChangeInfo={onChangeInfo} />
        case 'NoteVideo':
            return <NoteVideo info={info} onChangeInfo={onChangeInfo} />
        default:
            return <div>Unsupported note type</div>
    }
}