import { LongTxt } from "../../../cmps/LongTxt.jsx"

export function MailPreview({mail}){

    function onDate(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

    }


    return (
        <section className="mail-preview">
           <h4> {mail.subject}</h4>
            <p>From: {mail.from}</p>
            <p>Sent At: {onDate(mail.sentAt)}</p>
            <LongTxt txt={mail.body} />
        </section>
    )


}