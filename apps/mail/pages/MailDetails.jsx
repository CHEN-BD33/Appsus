import { mailService } from "../services/mail.service.js"
const {Link } = ReactRouterDOM 

const { useState, useEffect } = React

export function MailDetails({mailId, onCloseDetails}){
    const [mail, setMail] = useState(null)


    useEffect(() => {
        if (mailId) {
            loadMail()
        }
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => {
                console.log( mail)
                setMail(mail)})
            .catch((err) => {
                console.log('err:', err)
            })
    }


    if(!mail) return 'details...'

    return (
        <section className="mail-details">
          <div className="nav-bar-container">
            <div className="action-buttons-container">
            <button onClick={onCloseDetails}><img src="assets/css/apps/mail/images/back.png" /></button>
            <button onClick={()=>onRemoveMail(mail.id)}><img src="assets/css/apps/mail/images/empty/emprtTrash.png" /></button>
            <button><img src="assets/css/apps/mail/images/empty/unread.png" /></button>

            </div>
            <div className="navigate-container">
            <span className="mail-index-count">2 of 234</span>
            <button> <Link to={`/mail/${mail.prevMailId}`}><img src="assets/css/apps/mail/images/arrowLeft.png" /></Link></button>  
            <button> <Link to={`/mail/${mail.nextMailId}`}><img src="assets/css/apps/mail/images/arrowRight.png" /></Link></button>  
            </div>
        </div>

        <div className="mail-details-container">
            <h2 className="mail-subject">{mail.subject}</h2>
            <div className="user-details">
            <div> <span className="mail-fullName">{mail.fullname} </span><span className="mail-from">{`<${mail.from}>`}</span></div>
            <span className="mail-sentAt">{new Date(mail.sentAt).toLocaleString()}</span>
            </div>
            <span className="mail-to" >to {mail.to}</span>
            <p className="mail-body">{mail.body}</p>
            </div>
         
            </section>
    )


} 