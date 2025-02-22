import { NoteTxt } from "../cmps/NoteTxt.jsx"


export function NotePreview({ note, onChangeInfo }) {


    const backgroundColor = note.style ? note.style.backgroundColor : '#ffffff'

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