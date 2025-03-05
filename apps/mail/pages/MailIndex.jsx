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
    }, [filterBy])

    useEffect(() => {
        console.log("Updating searchParams with filterBy:", filterBy)
        if (filterBy.status) {
          setSearchParams(filterBy);
        } else {
          console.warn("filterBy is missing required fields:", filterBy)
        }
      }, [filterBy, setSearchParams])



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

    function onMarkAsRead(mailId) {
        mailService.get(mailId) 
            .then((mail) => {
                mail.isRead = true 
                return mailService.save(mail) 
            })
            .then(() => {
                showSuccessMsg("Marked as read")
                loadMails()
              })
            .catch((err) => {
                console.error('err:', err)
            })
    }

    function onClickStarred(mailId) {
        mailService
          .get(mailId)
          .then((mail) => {
            mail.isStarred = !mail.isStarred;
            return mailService.save(mail);
          })
          .then(() => {
            showSuccessMsg("Moved to starred")
            loadMails()
          })
          .catch((err) => {
            console.error("err:", err)
          });
      }

      function onRemoveMail(mailId) {
        return  mailService
          .get(mailId)
          .then((mail) => {
            if (mail.status === "trash") {
              return mailService.remove(mailId).then(() => {
                showSuccessMsg("Mail deleted")
              });
            } else {
              const updatedMail = { ...mail, status: "trash" }
              return mailService.save(updatedMail).then(() => {
                showSuccessMsg("Moved to trash")
              });
            }
          })
          .then(() => {
            loadMails();
          })
          .catch((err) => {
            console.error("Error:", err)
            showErrorMsg("Failed to delete")
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
                <MailFolderList 
                onFolderSelect={onFolderSelect}
                onCloseDetails={onCloseDetails}  
                />
            </div>

            <div className="mail-main">
            {selectedMailId ? (
                        <MailDetails 
                        mailId={selectedMailId} 
                        onCloseDetails={onCloseDetails} 
                        onRemoveMail={onRemoveMail}/>

                    ) : (
                        <MailList 
                        mails={mails} 
                        onRemoveMail={onRemoveMail} 
                        onMarkAsRead={onMarkAsRead} 
                        onSelectMail={onSelectMail} 
                        onClickStarred={onClickStarred} 
                        />
                    )}
            </div>
            </div>
    
            <Outlet />
        </section>
    )
}

