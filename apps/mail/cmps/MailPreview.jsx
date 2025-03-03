import { LongTxt } from "../../../cmps/LongTxt.jsx"
const {Link , useNavigate} = ReactRouterDOM
const {useState} = React


export function MailPreview({mail ,onMarkAsRead ,onSelectMail, onClickStarred}){

    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(mail.isChecked)
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const [isRead, setIsRead] = useState(mail.isRead)

    function onDate(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString(undefined, {  month: 'short', day: 'numeric' })

    }

    function handleRowClick() {
        if(mail.status ==='draft') {
            navigate("/mail/edit/")
        }
        onSelectMail(mail.id)
        if (!mail.isRead) {
            onMarkAsRead(mail.id)
            setIsRead(true)
        }
        mail.isRead = true
    }

    function handleCheckClick(){
        mail.isChecked = !mail.isChecked
        setIsChecked(!isChecked)
      
    }

    function handleStarClick() {
        setIsStarred(!isStarred)
        onClickStarred(mail.id)
    }

    
    
    return (
        <tr className={`mail-preview ${isRead ? 'read' : 'unread'}`}>

            <td onClick={handleCheckClick} className={`${isChecked ? 'checked' : 'unChecked'}`}></td>
            <td onClick={handleStarClick} className={`${isStarred ? 'starred' : 'unStarred'}`}></td>


            <td className={`fullname ${mail.isRead ? '' : 'bold'}`}  onClick={handleRowClick}>{mail.fullname}</td>
            
            <td className="text"  onClick={handleRowClick}>
                <span className={`subject ${mail.isRead ? '' : 'bold'}`} >{mail.subject}</span>
                <span> - </span>
                <span className="body"><LongTxt txt={ mail.body} /></span>
                
            </td>
            <td className={`date ${mail.isRead ? '' : 'bold'}`}  onClick={handleRowClick}>{onDate(mail.sentAt)}</td>    
        </tr>     
    )

}