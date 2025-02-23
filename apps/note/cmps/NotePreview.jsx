import { NoteTxt } from "../cmps/NoteTxt.jsx"
import { eventBusService } from "../../../services/event-bus.service.js"


export function NotePreview({ note }) {

    function onChangeInfo(updatedInfo) {
        const updateNote = { ...note, info: updatedInfo }

        eventBusService.emit('note-update', updateNote)
    }

    const backgroundColor = note.style ? note.style.backgroundColor : 'white'

    return (
        <div className='note-preview' style={{ backgroundColor }}>
            <DynamicCmp type={note.type} info={note.info} onChangeInfo={onChangeInfo} />
        </div >
    )
}

function DynamicCmp({ type, info, onChangeInfo }) {
    switch (type) {
        case 'NoteTxt':
            return <NoteTxt info={info} onChangeInfo={onChangeInfo} />
        default:
            return <div>Unsupported note type</div>
    }
}