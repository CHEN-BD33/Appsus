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
            <button onClick={onCloseDetails}>Back to List</button>
            <button onClick={()=>onRemoveMail(mail.id)}>Delete</button>
            </div>
            <div className="navigate-container">
            <button> <Link to={`/mail/${mail.nextMailId}`}>Next mail</Link></button>  
            <button> <Link to={`/mail/${mail.prevMailId}`}>Prev mail</Link></button>  
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