import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

const { useParams,useNavigate ,Link} = ReactRouterDOM

export function MailDetails(){
    const [mail, setMail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch((err) => {
                console.log('err:', err)
            })
    }


    if(!mail) return <div>Loading..</div>

    return (
        <section className="mail-details">
          <div className="nav-bar-container">
            <div className="action-buttons-container">
            <button><Link to="/mail">Back to List</Link></button>
            <button onClick={()=>onRemoveMail(mail.id)}>Delete</button>
            </div>
            <div className="navigate-container">
            <button> <Link to={`/mail/${mail.nextMailId}`}>Next mail</Link></button>  
            <button> <Link to={`/mail/${mail.prevMailId}`}>Prev mail</Link></button>  
            </div>
        </div>

        <div className="mail-container">
            <h2 className="mail-subject">{mail.subject}</h2>
            <div>
            <div className="sender-info"> {mail.fullName}<span>{mail.from} </span></div>
            <span className="mail-sentAt">{new Date(mail.sentAt).toLocaleString()}</span>
            </div>
            <span className="mail-to" >to {mail.to}</span>
            <p className="mail-body">{mail.body}</p>
            </div>
         
            </section>
    )


} 