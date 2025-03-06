const {Link , Outlet} = ReactRouterDOM 

import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"


const {useState , useEffect} = React


export function MailIndex({ filterBy, setSearchParams }) {
    
    const [mails, setMails] = useState(null)
    const [selectedMailId, setSelectedMailId] = useState(null)
    

  
    useEffect(() => {
        if (!filterBy.isFromNotes) {
            setSearchParams(filterBy)
        }
        loadMails()
    }, [filterBy])


    useEffect(() => {
        if (filterBy.status) {
          setSearchParams(filterBy)
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
        })
}

function onRead(mailId) {
  setMails((prevMails) => 
      prevMails.map((mail) => 
          mail.id === mailId ? { ...mail, isRead: true } : mail
      )
    )

  mailService.get(mailId) 
  .then((mail) => {
      mail.isRead = true; 
      return mailService.save(mail)
    })
    .then((mail) => {
  })
  .catch((err) => {
      console.error('Error:', err)
  })
}

    function onToggleRead(mailId) {
    setMails((prevMails) => 
        prevMails.map((mail) => 
            mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
        )
    )

  
    mailService.get(mailId) 
        .then((mail) => {
            mail.isRead = !mail.isRead; 
            return mailService.save(mail).then(() => mail)
        })
        .then((updatedMail) => {
        })
        .catch((err) => {
            console.error('Error:', err)
        })
    }

    function onClickStarred(mailId) {
        mailService
          .get(mailId)
          .then((mail) => {
            mail.isStarred = !mail.isStarred
            return mailService.save(mail)
          })
          .then(() => {
            loadMails()
          })
          .catch((err) => {
            console.error("err:", err)
          })
      }


      function onRemoveMail(mailId) {
       mailService
          .get(mailId)
          .then((mail) => {
            if (mail.status === "trash") {
              return mailService.remove(mailId).then(() => {
              })
            } else {
                if (mail.isStarred) mail.isStarred = false
              const updatedMail = { ...mail, status: "trash" }
              return mailService.save(updatedMail).then(() => {
              })
            }
          })
          .then(() => {
            loadMails()
          })
          .catch((err) => {
            console.error("Error:", err)
          })
      }

    function onFolderSelect(folder) {
      setSearchParams({ ...filterBy, status: folder })
    }
    function onSetSort(sortBy, sortOrder) {
      setSearchParams({ ...filterBy, sortBy, sortOrder: sortOrder === 'asc' ? 'asc' : 'desc' })
    }

    function onSetFilter(filterBy) {
      setSearchParams({ ...filterBy })   
    }

    function onSelectMail(mailId) {
        setSelectedMailId(mailId) 

    }

    function onCloseDetails() {
        setSelectedMailId(null)
    }

  function onMarkAllAsRead() {
 mails.map(mail => {
  onRead(mail.id) 
    });
  }
    

    if (!mails) return  <img src="assets/css/apps/mail/images/empty/loding.gif"/>
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
                mails={mails}  
                />
            </div>

            <div className="mail-main">
            {selectedMailId ? (
                        <MailDetails 
                        mailId={selectedMailId} 
                        onCloseDetails={onCloseDetails} 
                        onRemoveMail={onRemoveMail}
                        onToggleRead={onToggleRead}
                        mails={mails} 
                        />

                    ) : (
                        <MailList 
                        mails={mails} 
                        onSetSort={onSetSort}
                        onRemoveMail={onRemoveMail} 
                        onToggleRead={onToggleRead} 
                        onSelectMail={onSelectMail} 
                        onClickStarred={onClickStarred} 
                        onMarkAllAsRead={onMarkAllAsRead}
                        onSetFilter={onSetFilter} 
                        />
                    )}
            </div>
            </div>
    
            <Outlet />
        </section>
    )
}

