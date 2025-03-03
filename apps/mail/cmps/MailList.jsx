
import { MailPreview } from "./MailPreview.jsx"


export function MailList({mails , onMarkAsRead , onSelectMail , onClickStarred}){
    if (!mails) return "Loading..."
    return (
        <table className="mail-list">
            <tbody>
                {mails.map((mail) => (
                    <MailPreview key={mail.id} mail={mail} onMarkAsRead={onMarkAsRead} onSelectMail={onSelectMail} onClickStarred={onClickStarred} />
                ))}
            </tbody>
        </table>
    )

}