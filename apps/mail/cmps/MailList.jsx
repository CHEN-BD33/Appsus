

export function MailList({mails}) {

    return(
    <section>
    <h2>mail list:</h2>
    <ul className="mail-list">
        {mails.map((mail)=>
            <li key={mail.id}>
                 <h3>{mail.subject}</h3>
                 <p>From: {mail.from}</p>
            </li>
        )}
    </ul>
    </section>
    )
}
