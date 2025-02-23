import { utilService } from ".../services/util.service.js"
const { useState, useEffect, useRef } = React

export function NoteTxt({ info, onChangeInfo }) {
    const [infoToEdit, setInfoToEdit] = useState({ ...info })
    const onChangedebounce = useRef(utilService.debounce(onChangeInfo, 3000))

    useEffect(() => {
        onChangedebounce.current(infoToEdit)
    }, [infoToEdit])

    function handleChange({ target }) {
        const { value } = target
        setInfoToEdit(prevInfo => ({ ...prevInfo, txt: value }))
    }

    return (
        <div className='note-text'>
            <input type="text" value={infoToEdit.txt} onChange={handleChange} name="txt" placeholder="Enter your text..." />
        </div>
    )
}