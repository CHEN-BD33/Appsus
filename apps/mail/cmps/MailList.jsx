import { MailPreview } from "./MailPreview.jsx";


export function MailList({mails}) {

    return(
    <section>
    <h2>mail list:</h2>
    <ul className="mail-list">
        {mails.map((mail)=>
            <li key={mail.id}>
               <MailPreview mail = {mail}/>
            </li>
        )}
    </ul>
    </section>
    )
}
