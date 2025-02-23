import { utilService } from "../services/mail.util.service.js"
const { useState, useEffect, useRef } = React


export function MailFilter({ filterBy, onSetFilter}) {
    const initialFilter = { txt: '', isRead: '', ...filterBy }
    const [filter, setFilter] = useState(initialFilter)
    const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        onSetFilterDebounced.current(filter)
    }, [filter])

    function handleChange({ target }) {
        var { value, name: field, type } = target
        if (type === 'checkbox') value = target.checked
        if (field === 'isRead') {
    
          value = value === 'true' ? true : value === 'false' ? false : ''
        }
        setFilter(prev => ({ ...prev, [field]: value }))
      }


    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filter)
    }

    const { txt, isRead } = filter

    return (
        <section className="mail-filter">
          <form onSubmit={onSubmit}>
            <label htmlFor="txt">Search:</label>
            <input
              id="txt"
              name="txt"
              type="text"
              value={txt || ''}
              onChange={handleChange}
              placeholder="Search mail"
            />
    
            <label htmlFor="isRead">Read:</label>
            <select
              id="isRead"
              name="isRead"
              value={isRead === true ? 'true' : isRead === false ? 'false' : ''}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="true">Read</option>
              <option value="false">Unread</option>
            </select>
    
            <button type="submit">submit</button>
          </form>
        </section>
      )
    
}