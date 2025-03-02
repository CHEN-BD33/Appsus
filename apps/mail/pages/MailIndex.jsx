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
                        mail.id === mailId ? { ...mail, isRead: true, } : mail
                    )
                )
            })
            .catch((err) => {
                console.error('err:', err)
            })
    }

    function onClickStarred(mailId) {
        mailService.get(mailId)
            .then((mail) => {
               
                if (mail.status.includes('starred')) {
                
                    mail.isStarred = false
                    mail.status = mail.status.filter(status => status !== 'starred')
                } else {
                    mail.isStarred = true
                    mail.status.push('starred')
                }
                return mailService.save(mail)
            })
            .then(() => {
                setMails((prevMails) =>
                    prevMails.map((mail) =>
                        mail.id === mailId ? { ...mail, isStarred: mail.isStarred, status: mail.status } : mail
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
        setSelectedMailId(mailId) 
    }

    function onCloseDetails() {
        setSelectedMailId(null)
    }

    if (!mails) return 'Loading..'
    return (
        <section className="mail-index">
           
            <div className="mail-container">
            <div className="mail-sidebar">
                <nav className="compose-btn-container">
                    <Link to="/mail/edit">
                        <button className="compose-btn">
                            <img src="assets/css/apps/mail/images/empty/compose.png"/>
                            Compose</button>
                    </Link>
                </nav>
                <MailFolderList onFolderSelect={onFolderSelect} />
            </div>

            <div className="mail-main">
            {selectedMailId ? (
                        <MailDetails mailId={selectedMailId} onCloseDetails={onCloseDetails}/>
                    ) : (
                        <MailList mails={mails} onRemoveMail={onRemoveMail} onMarkAsRead={onMarkAsRead} onSelectMail={onSelectMail} onClickStarred={onClickStarred} />
                    )}
            </div>
            </div>
    
            <Outlet />
        </section>
    )
}

