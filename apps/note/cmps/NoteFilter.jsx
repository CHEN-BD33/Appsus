import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function NoteFilter({ filterBy, onFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    // const initialFilterBy = useRef({ ...filterBy })

    const onSetFilterDebounce = useRef(utilService.debounce(onFilterBy, 1500))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name, type, value } = target
        if (type === 'number') value = +value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    // function reset() {
    //     setFilterByToEdit(initialFilterBy.current)
    // }

    // function onSubmitForm(ev) {
    //     ev.preventDefault()
    //     onFilterBy(filterByToEdit)
    // }



    return (
        <section className="note-filter">
            <h2>Search Notes</h2>

            <div className="filter-container">
                <label htmlFor="title">Title</label>
                <input name="title" value={filterByToEdit.title} onChange={handleChange} type="text" id="title" />
            </div>

        </section>
    )
}