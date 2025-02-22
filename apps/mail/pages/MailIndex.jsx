const {Link} = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const {useState , useEffect} = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)

    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

   
    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
    }, [filterBy])

    function loadMails() {
             mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
            .catch((err) => {
                console.error('err:', err)
                showErrorMsg('Failed to load mails')
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMails) =>
                    prevMails.filter((mail) => mail.id !== mailId)
                )
                showSuccessMsg('success')
            })
            .catch((err) => {
                console.error('err:', err)
                showErrorMsg('failed')
                
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!mails) return 'Loading..'
    return (
        <section className="mail-index">
            <h1>Mail Index</h1>
            <button><Link to="/mail/edit">Compose</Link></button>
            <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
           
        </section>
    )
}
