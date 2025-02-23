import { utilService } from "../services/mail.util.service.js"


const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        onSetFilterDebounced.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        var { value, name: field } = target
        console.log(field ,value)
        if (field === 'isRead') {
            value = value === 'true' ? true : value === 'false' ? false : ''
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { subject, isRead } = filterByToEdit

    return (
        <section className="mail-filter">
            <h2>Filter Mails:</h2>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="subject">Search by subject:</label>
                <input
                    value={subject}
                    onChange={handleChange} 
                    name="subject"
                    type="text"
                    id="subject"
                />

                <label htmlFor="isRead">Read:</label>
                <select
                    value={isRead === true ? 'true' : isRead === false ? 'false' : ''}
                    onChange={handleChange} 
                    name="isRead"
                    type="text"
                    id="isRead"
                >
                    <option value="">All</option>
                    <option value="true">Read</option>
                    <option value="false">Unread</option>
                </select>

                <button>Submit</button>
            </form>
        </section>
    )
}