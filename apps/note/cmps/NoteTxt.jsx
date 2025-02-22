export function NoteTxt({ info, onChangeInfo }) {
    return (
        <div className='note-text'>
            <input type="text" value={info.txt} onChange={(ev) => onChangeInfo({ txt: ev.target.value })} id="txt" name="txt" placeholder="Enter your text..." />
        </div>
    )
}