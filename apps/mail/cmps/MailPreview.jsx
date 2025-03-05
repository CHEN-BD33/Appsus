import { LongTxt } from "../../../cmps/LongTxt.jsx"
const {Link , useNavigate} = ReactRouterDOM
const {useState} = React


export function MailPreview({mail , onToggleRead , onSelectMail , onClickStarred ,onRemoveMail}){

    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(mail.isChecked)
    const [isStarred, setIsStarred] = useState(mail.isStarred)

    function onDate(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString(undefined, {  month: 'short', day: 'numeric' })

    }

    function handleRowClick() {
        if(mail.status === 'draft') {
            navigate(`/mail/edit/${mail.id}`)
        } else {
            onSelectMail(mail.id)
            if (!mail.isRead) {
                onToggleRead(mail.id)
            }
        }
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
       
        <tr className={`mail-preview ${mail.isRead ? "read" : "unread"}`}>
            <td>
                <div className="mail-content">
                    <span onClick={handleCheckClick} className={`${isChecked ? "checked" : "unChecked"}`}></span>
                    <span onClick={handleStarClick} className={`${isStarred ? "starred" : "unStarred"}`}></span>

                    <span className={`fullname ${mail.isRead ? "" : "bold"}`} onClick={handleRowClick}>
                        {mail.fullname}
                    </span>

                    <span className="text" onClick={handleRowClick}>
                        <span className={`subject ${mail.isRead ? "" : "bold"}`}>{mail.subject}</span>
                        <span> - </span>
                        <span className="body">
                            <LongTxt txt={mail.body} />
                        </span>
                    </span>
                    <span className="unhover-date">
                    <span className={`date ${mail.isRead ? "" : "bold"}`} onClick={handleRowClick}>
                        {onDate(mail.sentAt)}
                    </span>
                    
                    </span>
                    <span className="hover-icons">
                        <span onClick={()=> onRemoveMail(mail.id)} className="delete-icon"><img src="assets/css/apps/mail/images/empty/emprtTrash.png" /></span>
                        <span onClick={()=> onToggleRead(mail.id)}className="unread-icon"><img src="assets/css/apps/mail/images/empty/unread.png" /></span>
                    </span>
                </div>
            </td>
        </tr>
    )

}