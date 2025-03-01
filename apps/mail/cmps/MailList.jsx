
import { MailPreview } from "./MailPreview.jsx"


export function MailList({mails , onMarkAsRead , onSelectMail}){
    if (!mails) return "Loading..."
    return (
        <table className="mail-list">
            <tbody>
                {mails.map((mail) => (
                    <MailPreview key={mail.id} mail={mail} onMarkAsRead={onMarkAsRead} onSelectMail={onSelectMail} />
                ))}
            </tbody>
        </table>
    )

}