export function NoteTxt({ info, onChangeInfo }) {
    return (
        <div className='note-text'>
            <textarea value={info.txt} onChange={(ev) => onChangeInfo({ txt: ev.target.value })} placeholder="Enter your text..." />
        </div>
    )
}