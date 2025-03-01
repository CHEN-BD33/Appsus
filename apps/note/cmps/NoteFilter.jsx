import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function NoteFilter({ filterBy, onFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const initialFilterBy = useRef({ ...filterBy })

    const onSetFilterDebounce = useRef(utilService.debounce(onFilterBy, 1500))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name, value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    function setNoteType(type) {
        if (filterByToEdit.type === type) {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, type: '' }))
        } else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, type }))
        }
    }

    function reset() {
        setFilterByToEdit(initialFilterBy.current)
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onFilterBy(filterByToEdit)
    }

    return (
        <section className="note-filter">

            <form onSubmit={onSubmitForm} className="filter-container">
                <label htmlFor="search-input"></label>
                <i className="fa-solid fa-search search-icon"></i>

                <input name="txt" value={filterByToEdit.txt || ''} onChange={handleChange} type="text" id="searchInput" placeholder="Search in notes..." />
                {(filterByToEdit.txt || filterByToEdit.type) && (
                    <button type="button" className="reset-filter-btn" onClick={reset} title="Clear search"><i className="fa-solid fa-times"></i></button>)}
                <div className="filter-type-buttons">
                    <button type="button" className={`filter-type-btn ${filterByToEdit.type === 'NoteTxt' ? 'active' : ''}`} onClick={() => setNoteType('NoteTxt')} title="Text notes"><i className="fa-solid fa-font"></i></button>
                    <button type="button" className={`filter-type-btn ${filterByToEdit.type === 'NoteTodos' ? 'active' : ''}`} onClick={() => setNoteType('NoteTodos')} title="Todo notes"><img src='assets\css\imgs\notetodos.svg'></img></button>
                    <button type="button" className={`filter-type-btn ${filterByToEdit.type === 'NoteImg' ? 'active' : ''}`} onClick={() => setNoteType('NoteImg')} title="Image notes"><img src='assets\css\imgs\noteimage.svg'></img></button>
                    <button type="button" className={`filter-type-btn ${filterByToEdit.type === 'NoteVideo' ? 'active' : ''}`} onClick={() => setNoteType('NoteVideo')} title="Video notes"><i className="fa-brands fa-youtube"></i></button>
                </div>
            </form>
        </section>
    )

}