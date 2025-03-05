
import { MailPreview } from "./MailPreview.jsx"
import { MailSorted } from "./MailSorted.jsx"


export function MailList({mails , onMarkAsRead , onSelectMail , onClickStarred ,onRemoveMail}){
    if (!mails) return "Loading..."
    return (
    <table className="mail-list">
        <thead>
        <MailSorted />
        </thead>
            <tbody>
                {mails.map((mail) => (
                    <MailPreview key={mail.id}
                    mail={mail} 
                    onMarkAsRead={onMarkAsRead}
                    onSelectMail={onSelectMail}
                    onClickStarred={onClickStarred}
                    onRemoveMail={onRemoveMail} 
                    />
                ))}
            </tbody>
        </table>
    
    )

}