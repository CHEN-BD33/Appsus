

const {useState, useEffect} = React

export function MailFilter({filterBy , onSetFilterBy}){

    const[filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    useEffect(()=>{
        onSetFilterBy(filterByToEdit)
    },[filterByToEdit])

    
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    
    function onSubmitForm(ev){
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)

    }
    

    return(
        <section className="mail-filter">
            <h2>Filter Mails:</h2>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="subject">Search:</label>
                <input name="subject" value={filterByToEdit.subject || ''}onChange={handleChange} type="text" id="bySubject"  placeholder="Search by subject..."/>

                <label htmlFor="isRead">Read:</label>
                <select name="isRead" value={filterByToEdit.isRead || ''} onChange={handleChange}>
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
                </select>

                <button>Submit</button>
            </form>
        </section>
    )
}