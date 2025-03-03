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

                <section className="filter-type-select">
                    <select name="type" value={filterByToEdit.type || ''} onChange={handleChange} className="note-type-select" title="Search by Type">
                        <option value="">All Note</option>
                        <option value="NoteTxt">Text Notes</option>
                        <option value="NoteTodos">Todos Notes</option>
                        <option value="NoteImg">Image Notes</option>
                        <option value="NoteVideo">Video Notes</option>
                    </select>
                </section>
            </form>
        </section>
    )

}