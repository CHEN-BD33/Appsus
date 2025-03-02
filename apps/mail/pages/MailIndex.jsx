const {Link , Outlet} = ReactRouterDOM 

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { mailService } from "../services/mail.service.js";
import { MailList } from "../cmps/MailList.jsx";
import { MailDetails } from "./MailDetails.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";

const {useState , useEffect} = React
const { useSearchParams } = ReactRouterDOM


export function MailIndex() {
    
    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams)) 
    const [selectedMailId, setSelectedMailId] = useState(null)

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadMails() {
             mailService.query(filterBy)
            .then((mails) => {
        console.log('Mails:', mails)

                setMails(mails)
            })
            .catch((err) => {
                console.error('err:', err)
                showErrorMsg('Failed to load mails')
            })
    }

    function onMarkAsRead(mailId) {
        mailService.get(mailId) 
            .then((mail) => {
                mail.isRead = true 
                return mailService.save(mail) 
            })
            .then(() => {
                setMails((prevMails) =>
                    prevMails.map((mail) =>
                        mail.id === mailId ? { ...mail, isRead: true } : mail
                    )
                )
            })
            .catch((err) => {
                console.error('err:', err)
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

    function onSelectMail(mailId) {
        setSelectedMailId(mailId) // 🔹 Set selected mail ID
    }

    function onCloseDetails() {
        setSelectedMailId(null); // 🔹 Close details and show list again
    }
    console.log(selectedMailId)

    if (!mails) return 'Loading..'
    return (
        <section className="mail-index">
           
            <div className="mail-container">
               {/* <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}

            <div className="mail-sidebar">
                <nav className="compose-btn-container">
                    <Link to="/mail/edit">
                        <button className="compose-btn">
                            <img src="assets/css/imgs/compose.png"/>
                            Compose</button>
                    </Link>
                </nav>
                <MailFolderList onFolderSelect={onFolderSelect} />
            </div>

            <div className="mail-main">
            {selectedMailId ? (
                        <MailDetails mailId={selectedMailId} onCloseDetails={onCloseDetails}/>
                    ) : (
                        <MailList mails={mails} onRemoveMail={onRemoveMail} onMarkAsRead={onMarkAsRead} onSelectMail={onSelectMail} />
                    )}
            </div>
            </div>
    
            <Outlet />
        </section>
    )
}

