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
        let { value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
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
            <h2>Search Notes</h2>

            <form onSubmit={onSubmitForm} className="filter-container">
                <label htmlFor="search-input">Search</label>
                <input name="txt" value={filterByToEdit.txt || ''} onChange={handleChange} type="text" id="searchInput" placeholder="Search in notes..." />
                <button type="button" onClick={reset}>Reset</button>
                <button>Submit</button>
            </form>
        </section>
    )
}