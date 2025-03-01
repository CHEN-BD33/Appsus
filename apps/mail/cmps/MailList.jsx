
import { MailPreview } from "./MailPreview.jsx"


export function MailList({mails , onMarkAsRead }){
    if (!mails) return 'Loading..'
    return (
        <table className="mail-list">
            <tbody>
                {mails.map((mail) => (
                    <MailPreview key={mail.id} mail={mail} onMarkAsRead={onMarkAsRead} />
                ))}
            </tbody>
        </table>
    )

}