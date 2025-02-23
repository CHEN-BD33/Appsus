import { utilService } from ".../services/util.service.js"
const { useState, useEffect, useRef } = React

export function NoteTxt({ info, onChangeInfo }) {
    const [txt, setTxt] = useState(info.txt)
    const debouncedOnChange = useRef(utilService.debounce(onChangeInfo, 3000))

    useEffect(() => {
        setTxt(info.txt)
    }, [info.txt])

    function handleChange(ev) {
        const value = ev.target.value
        setTxt(value)

        const updatedInfo = { ...info, txt: value }
        debouncedOnChange.current(updatedInfo)
    }

    return (
        <div className='note-text'>
            <input type="text" value={txt} onChange={handleChange} name="txt" placeholder="Enter your text..." />
        </div>
    )
}