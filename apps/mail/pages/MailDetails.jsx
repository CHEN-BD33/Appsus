import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

const { useParams,useNavigate ,Link} = ReactRouterDOM

export function MailDetails(onRemoveMail){
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
            <h1 className="mail-subject">{mail.subject}</h1>
            <h3 className="sender-info">{mail.from} {mail.fullName}</h3>
            <h3 className="mail-to" >To:{mail.to}</h3>
            <h3 className="mail-sentAt">{new Date(mail.sentAt).toLocaleString()}</h3>
            <p className="mail-body">{mail.body}</p>
            <div className="action-buttons">
            <button><Link to="/mail">Back to List</Link></button>
            <button> <Link to={`/mail/${mail.nextMailId}`}>Next mail</Link></button>  
            <button> <Link to={`/mail/${mail.prevMailId}`}>Prev mail</Link></button>  
            <button onClick={()=>onRemoveMail(mail.id)}>Delete</button>
            </div>
            </section>
    )


} 