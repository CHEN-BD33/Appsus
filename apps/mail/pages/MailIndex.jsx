const {Link , Outlet} = ReactRouterDOM 

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
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
        setFilterBy({ ...filterBy, status: folder })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!mails) return 'Loading..'
    return (
        <section className="mail-index">
           
            <div className="mail-container">

            <div className="mail-sidebar">
                <nav className="compose-btn-container">
                    <Link to="/mail/edit">
                        <button className="compose-btn">Compose</button>
                    </Link>
                </nav>
                <MailFolderList onFolderSelect={onFolderSelect} />
            </div>

            <div className="mail-main">
               <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <MailList mails={mails} />
            </div>
            </div>
            
            <Outlet />
        </section>
    )
}

