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

    const {txt} = filter

    return (
        <section className="mail-filter">
          <form onSubmit={onSubmit}>
            <div className="search-container">
              <img src="assets/css/apps/mail/images/search-icon.svg"/>
            <input
              id="txt"
              name="txt"
              type="text"
              value={txt || ''}
              onChange={handleChange}
              placeholder="Search mail"
            />
            </div>

          </form>
        </section>
      )
    
}