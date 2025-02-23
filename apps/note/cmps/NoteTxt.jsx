const { useState, useEffect } = React

export function NoteTxt({ info, onChangeInfo }) {
    const [infoToEdit, setInfoToEdit] = useState({ ...info })


    useEffect(() => {
        setInfoToEdit(info)
    }, [info])

    function handleChange({ target }) {
        const { value } = target
        const newInfo = { ...infoToEdit, txt: value }
        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
    }

    return (
        <div className='note-text'>
            <textarea type="text" value={infoToEdit.txt} onChange={handleChange} name="txt" style={{ backgroundColor: 'inherit' }} placeholder="Enter your text..." />
        </div>
    )
}