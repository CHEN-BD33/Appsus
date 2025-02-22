const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
    
    const [filterByToEdit, setfilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange(ev) {
        let { value, type, name: field } = ev.target

        if (type === 'number') value = +value || ''
        setfilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

  
    return (
        <section className="note-filter">
            <h2>Search Notes</h2>

            <div className="filter-container">
                <label htmlFor="title">Title</label>
                <input name="title" value={filterByToEdit.title} onChange={onHandleChange} type="text" id="title" />
            </div>

        </section>
    )
}