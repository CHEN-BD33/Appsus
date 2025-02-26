import { LongTxt } from "../../../cmps/LongTxt.jsx"
const {useNavigate} = ReactRouterDOM 



export function MailPreview({mail ,onMarkAsRead }){
    const navigate = useNavigate()

    function onDate(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

    }

    function handleRowClick() {
        if (!mail.isRead) onMarkAsRead(mail.id)
        navigate(`/mail/${mail.id}`)
        mail.isRead =  true
    }

    return (
        <tr className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`} onClick={handleRowClick}>
            <td className={`fullname ${mail.isRead ? '' : 'bold'}`}>{mail.fullname}</td>
            
            <td className="text">
                <span className={`subject ${mail.isRead ? '' : 'bold'}`} >{mail.subject}</span>
                <span> - </span>
                <span className="body"><LongTxt txt={ mail.body} /></span>
                
            </td>
            <td className={`date ${mail.isRead ? '' : 'bold'}`}>{onDate(mail.sentAt)}</td>    
        </tr>     
    )

}