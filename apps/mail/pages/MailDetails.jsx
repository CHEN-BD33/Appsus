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
            <h1>{mail.subject}</h1>
            <h3>From:{mail.from}</h3>
            <h3>To:{mail.to}</h3>
            <h3>Sent At:{new Date(mail.sentAt).toLocaleString()}</h3>
            <p>{mail.body}</p>
            <button><Link to="/mail">Back to List</Link></button>
            <button> <Link to={`/mail/${mail.nextMailId}`}>Next mail</Link></button>  
            <button> <Link to={`/mail/${mail.prevMailId}`}>Prev mail</Link></button>  
            <button onClick={()=>onRemoveMail(mail.id)}>Delete</button>
        </section>
    )


} 