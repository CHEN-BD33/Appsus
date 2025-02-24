const {Link} = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { MailFolderList } from "../cmps/data-table/MailFolderList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"

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
    function onFolderSelect(folder) {
        setFilterBy({ ...filterBy, status: folder });
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!mails) return 'Loading..'
    return (
        <section className="mail-index">
           
            <div className="mail-container">
            <div className="mail-sidebar">
                <div className="compose-btn-container">
            <button className="compose-btn"><Link to="/mail/edit">Compose</Link> </button>
                </div>
                <MailFolderList onFolderSelect={onFolderSelect} />
                </div>
            <div className="mail-main">
               <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <DataTable mails={mails} onRemoveMail={onRemoveMail} />
            </div>
            </div>
        </section>
    )
}
