
import { MailPreview } from "./MailPreview.jsx"
import { MailSorted } from "./MailSorted.jsx"


export function MailList({mails , onToggleRead , onSelectMail , onClickStarred ,onRemoveMail}){
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
                    onToggleRead={onToggleRead}
                    onSelectMail={onSelectMail}
                    onClickStarred={onClickStarred}
                    onRemoveMail={onRemoveMail} 
                    />
                ))}
            </tbody>
        </table>
    
    )

}