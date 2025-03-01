
import { mailService } from "../services/mail.service.js"
const {useState , useEffect} = React

export function MailUnreadCounter(){
    
    const [unreadCount, setUnreadCount] = useState(null)
    useEffect(() => {
        mailService.query()
        .then(mails => {
            const count = mails.filter(mail => !mail.isRead).length
            console.log(count)
            setUnreadCount(count)
            })
            .catch(err => console.log('err:', err))
    }, [unreadCount])

    return <span className="unread-count">{unreadCount}</span>
       
    



}