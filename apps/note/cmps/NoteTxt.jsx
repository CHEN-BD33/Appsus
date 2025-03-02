import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function NoteTxt({ info, onChangeInfo, isExpanded = false, isPreview = false }) {
    const [infoToEdit, setInfoToEdit] = useState({ ...info })
    const debouncedChangeInfo = useRef(utilService.debounce((newInfo) => { onChangeInfo(newInfo) }, 1500))

    useEffect(() => {
        setInfoToEdit(info)
    }, [info])

    function handleChange({ target }) {
        const { name, value } = target
        const newInfo = { ...infoToEdit, [name]: value }
        setInfoToEdit(newInfo)
        debouncedChangeInfo.current(newInfo)
        // onChangeInfo(newInfo)
        if (target.tagName === 'TEXTAREA') {
            target.style.height = 'auto'
            target.style.height = target.scrollHeight + 'px'
        }
    }

    function handleTextareaFocus({ target }) {
        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 'px'
    }

    if (isPreview) {
        if (info.title && !info.txt) {
            return (
                <input className="note-text-title" type="text" name="title" value={infoToEdit.title || ''} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder="Enter title..." />
            )
        }
        else if (info.txt && !info.title) {
            return (
                <textarea className="note-text-txt" type="text" name="txt" value={infoToEdit.txt || ''} onChange={handleChange} onFocus={handleTextareaFocus} style={{ backgroundColor: 'inherit' }} placeholder="Enter Note..." />
            )
        }
        else {
            return (
                <section className="note-text-info">
                    <section>
                        <input className="note-text-title" type="text" name="title" value={infoToEdit.title || ''} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder="Enter title..." />
                    </section>
                    <textarea className="note-text-txt" type="text" name="txt" value={infoToEdit.txt || ''} onChange={handleChange} onFocus={handleTextareaFocus} style={{ backgroundColor: 'inherit' }} placeholder="Enter Note..." />
                </section>
            )
        }
    }

    else if (isExpanded) {
        return (
            <section className="note-text-add">
                <section>
                    <input className="note-text-title" type="text" name="title" value={infoToEdit.title || ''} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder="Enter title..." />
                </section>
                <textarea className="note-text-txt" type="text" name="txt" value={infoToEdit.txt || ''} onChange={handleChange} onFocus={handleTextareaFocus} style={{ backgroundColor: 'inherit' }} placeholder="Enter Note..." />
            </section>
        )
    }

    else {
        return (
            <section className='note-text'>
                <textarea className="note-text-txt" type="text" name="txt" value={infoToEdit.txt || ''} onChange={handleChange} onFocus={handleTextareaFocus} style={{ backgroundColor: 'inherit' }} placeholder="Enter Note..." />
            </section>
        )
    }
}
