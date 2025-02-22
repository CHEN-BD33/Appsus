import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail-service.js"

const {useState , useEffect} = React


export function MailIndex() {
    const [mails , setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({subject:''})
   
    useEffect(() => {
        loadMails()
      }, [filterBy])

      function loadMails(){
        mailService.query(filterBy)
        .then(mails =>{
            setMails(mails)
        })
        
    }

    if (!mails) return <div>Loading...</div>
    return (
    <section className="mail-index">
     <h1>mail index</h1>
    <MailList mails={mails}/>
    </section>
    )
}

