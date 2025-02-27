import { LongTxt } from "../../../cmps/LongTxt.jsx"
const {useNavigate} = ReactRouterDOM 



export function MailPreview({mail}){
    const navigate = useNavigate()

    function onDate(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

    }

    function handleRowClick() {
        navigate(`/mail/${mail.id}`)
   
    }

    return (
        <tr className="mail-preview" onClick={handleRowClick}>
            <td>{mail.fullname}</td>
            <td>{mail.subject}</td>
            <td><LongTxt txt={mail.body} /></td>
            <td>{onDate(mail.sentAt)}</td>    
        </tr>     
    )

}